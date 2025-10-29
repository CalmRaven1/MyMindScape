import wolframalpha
import os

client = wolframalpha.Client(os.getenv('WOLFRAM_APP_ID'))

def process_query(query):
    """Process mathematical or scientific queries using Wolfram Alpha"""
    try:
        res = client.query(query)
        return {
            "success": True,
            "result": next(res.results).text,
            "pods": [
                {
                    "title": pod.title,
                    "text": pod.text
                }
                for pod in res.pods
            ]
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }