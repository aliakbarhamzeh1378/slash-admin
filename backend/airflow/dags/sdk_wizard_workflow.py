from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models import Variable
import requests
import json
import os
import docker
from pathlib import Path

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def crawl_website(**context):
    # Get the SDK wizard data from the context
    sdk_wizard_data = context['ti'].xcom_pull(task_ids='get_sdk_wizard_data')
    
    # Implement website crawling logic here
    # This is a placeholder - you'll need to implement the actual crawling logic
    store_url = sdk_wizard_data['store_url']
    # Add your crawling implementation here
    
    return {'status': 'success', 'crawled_data': 'crawled_data_placeholder'}

def process_field_mapping(**context):
    # Get the crawled data from the previous task
    crawled_data = context['ti'].xcom_pull(task_ids='crawl_website')['crawled_data']
    
    # Get the field mappings from SDK wizard data
    sdk_wizard_data = context['ti'].xcom_pull(task_ids='get_sdk_wizard_data')
    field_mappings = sdk_wizard_data['field_mappings']
    
    # Implement field mapping logic here
    # This is a placeholder - you'll need to implement the actual mapping logic
    
    return {'status': 'success', 'mapped_data': 'mapped_data_placeholder'}

def create_chromadb_embeddings(**context):
    # Get the mapped data from the previous task
    mapped_data = context['ti'].xcom_pull(task_ids='process_field_mapping')['mapped_data']
    
    # Implement ChromaDB embedding creation logic here
    # This is a placeholder - you'll need to implement the actual embedding logic
    
    return {'status': 'success', 'chromadb_embeddings': 'chromadb_embeddings_placeholder'}

def create_faiss_embeddings(**context):
    # Get the mapped data from the previous task
    mapped_data = context['ti'].xcom_pull(task_ids='process_field_mapping')['mapped_data']
    
    # Implement FAISS embedding creation logic here
    # This is a placeholder - you'll need to implement the actual embedding logic
    
    return {'status': 'success', 'faiss_embeddings': 'faiss_embeddings_placeholder'}

def build_docker_image(**context):
    # Get embeddings from previous tasks
    chromadb_embeddings = context['ti'].xcom_pull(task_ids='create_chromadb_embeddings')['chromadb_embeddings']
    faiss_embeddings = context['ti'].xcom_pull(task_ids='create_faiss_embeddings')['faiss_embeddings']
    
    # Create a temporary directory for Docker build context
    build_dir = Path('/tmp/docker_build')
    build_dir.mkdir(exist_ok=True)
    
    # Create Dockerfile
    dockerfile_content = """
FROM python:3.9-slim

WORKDIR /app

# Copy embeddings
COPY embeddings /app/embeddings

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Command to run the application
CMD ["python", "app.py"]
"""
    
    with open(build_dir / 'Dockerfile', 'w') as f:
        f.write(dockerfile_content)
    
    # Create embeddings directory and copy embeddings
    embeddings_dir = build_dir / 'embeddings'
    embeddings_dir.mkdir(exist_ok=True)
    
    # Here you would copy the actual embeddings files
    # For now, we'll just create placeholder files
    with open(embeddings_dir / 'chromadb_embeddings.pkl', 'w') as f:
        f.write(chromadb_embeddings)
    
    with open(embeddings_dir / 'faiss_embeddings.pkl', 'w') as f:
        f.write(faiss_embeddings)
    
    # Build Docker image
    client = docker.from_env()
    image, build_logs = client.images.build(
        path=str(build_dir),
        tag='sdk-wizard-app:latest',
        rm=True
    )
    
    return {'status': 'success', 'image_id': image.id}

def run_docker_container(**context):
    # Get the built image ID
    image_id = context['ti'].xcom_pull(task_ids='build_docker_image')['image_id']
    
    # Run the Docker container
    client = docker.from_env()
    container = client.containers.run(
        image_id,
        detach=True,
        ports={'5000/tcp': 5000},  # Adjust ports as needed
        environment={
            'CHROMADB_EMBEDDINGS_PATH': '/app/embeddings/chromadb_embeddings.pkl',
            'FAISS_EMBEDDINGS_PATH': '/app/embeddings/faiss_embeddings.pkl'
        }
    )
    
    return {'status': 'success', 'container_id': container.id}

# Define the DAG
dag = DAG(
    'sdk_wizard_workflow',
    default_args=default_args,
    description='Workflow triggered after SDK wizard completion',
    schedule_interval=None,  # This DAG will be triggered manually
    start_date=datetime(2024, 1, 1),
    catchup=False,
)

# Define tasks
get_sdk_wizard_data = PythonOperator(
    task_id='get_sdk_wizard_data',
    python_callable=lambda **context: context['dag_run'].conf,
    dag=dag,
)

crawl_website_task = PythonOperator(
    task_id='crawl_website',
    python_callable=crawl_website,
    provide_context=True,
    dag=dag,
)

process_field_mapping_task = PythonOperator(
    task_id='process_field_mapping',
    python_callable=process_field_mapping,
    provide_context=True,
    dag=dag,
)

create_chromadb_embeddings_task = PythonOperator(
    task_id='create_chromadb_embeddings',
    python_callable=create_chromadb_embeddings,
    provide_context=True,
    dag=dag,
)

create_faiss_embeddings_task = PythonOperator(
    task_id='create_faiss_embeddings',
    python_callable=create_faiss_embeddings,
    provide_context=True,
    dag=dag,
)

build_docker_image_task = PythonOperator(
    task_id='build_docker_image',
    python_callable=build_docker_image,
    provide_context=True,
    dag=dag,
)

run_docker_container_task = PythonOperator(
    task_id='run_docker_container',
    python_callable=run_docker_container,
    provide_context=True,
    dag=dag,
)

# Define task dependencies
get_sdk_wizard_data >> crawl_website_task >> process_field_mapping_task
process_field_mapping_task >> [create_chromadb_embeddings_task, create_faiss_embeddings_task]
[create_chromadb_embeddings_task, create_faiss_embeddings_task] >> build_docker_image_task >> run_docker_container_task 