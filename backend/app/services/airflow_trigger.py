import requests
from app.core.config import settings

def trigger_sdk_wizard_workflow(sdk_wizard_data: dict):
    """
    Trigger the Airflow DAG for SDK wizard workflow
    
    Args:
        sdk_wizard_data (dict): The SDK wizard data to be processed
    """
    airflow_url = f"{settings.AIRFLOW_URL}/api/v1/dags/sdk_wizard_workflow/dagRuns"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {settings.AIRFLOW_BASIC_AUTH}"
    }
    
    payload = {
        "conf": sdk_wizard_data
    }
    
    try:
        response = requests.post(
            airflow_url,
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error triggering Airflow DAG: {str(e)}")
        raise 