from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from flask_cors import CORS, cross_origin
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict
from langchain_community.llms import Ollama
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import PDFPlumberLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.prompts import PromptTemplate
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

folder_path = "db"
ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
cached_llm = Ollama(base_url=ollama_host, model="llama3.1")
embedding = FastEmbedEmbeddings()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1024, chunk_overlap=80, length_function=len, is_separator_regex=False
)

raw_prompt = PromptTemplate.from_template(
    """ 
    <s>[INST] You are a technical assistant good at searching documents. If you do not have an answer from the provided information say so. [/INST] </s>
    [INST] {input}
           Context: {context}
           Answer:
    [/INST]
"""
)

class QueryRequest(BaseModel):
    query: str

class DeletePDFRequest(BaseModel):
    file_name: str


@app.post("/ai")
async def ai_post(query_request: QueryRequest):
    print("Post /ai called")
    query = query_request.query
    print(f"query: {query}")

    response = cached_llm.invoke(query)
    print(response)

    response_answer = {"answer": response}
    return response_answer


@app.post("/ask_pdf")
async def ask_pdf_post(query_request: QueryRequest):
    print("Post /ask_pdf called")
    query = query_request.query
    print(f"query: {query}")

    print("Loading vector store")
    vector_store = Chroma(persist_directory=folder_path, embedding_function=embedding)

    print("Creating chain")
    retriever = vector_store.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={
            "k": 20,
            "score_threshold": 0.1,
        },
    )

    document_chain = create_stuff_documents_chain(cached_llm, raw_prompt)
    chain = create_retrieval_chain(retriever, document_chain)

    result = chain.invoke({"input": query})
    print(result)

    sources = []
    for doc in result["context"]:
        sources.append(
            {"source": doc.metadata["source"], "page_content": doc.page_content}
        )

    response_answer = {"answer": result["answer"], "sources": sources}
    return response_answer


@app.post("/pdf")
async def pdf_post(file: UploadFile = File(...)):
    file_name = file.filename
    save_file = f"pdf/{file_name}"

    with open(save_file, "wb") as f:
        f.write(await file.read())

    print(f"filename: {file_name}")

    loader = PDFPlumberLoader(save_file)
    docs = loader.load_and_split()
    print(f"docs len={len(docs)}")

    chunks = text_splitter.split_documents(docs)
    print(f"chunks len={len(chunks)}")

    vector_store = Chroma.from_documents(
        documents=chunks, embedding=embedding, persist_directory=folder_path
    )

    vector_store.persist()

    response = {
        "status": "Successfully Uploaded",
        "filename": file_name,
        "doc_len": len(docs),
        "chunks": len(chunks),
    }
    return response


@app.post("/delete_pdf")
async def delete_pdf_post(delete_pdf_request: DeletePDFRequest):
    print("Post /delete_pdf called")
    file_name = delete_pdf_request.file_name
    print(f"file_name: {file_name}")

    file_path = f"pdf/{file_name}"
    if os.path.exists(file_path):
        os.remove(file_path)
        response = {"status": "File deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="File not found")

    return response


@app.get("/list_pdfs")
async def list_pdfs():
    print("Get /list_pdfs called")
    pdf_files = [file for file in os.listdir("pdf") if file.endswith(".pdf")]
    response = {"pdf_files": pdf_files}
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)