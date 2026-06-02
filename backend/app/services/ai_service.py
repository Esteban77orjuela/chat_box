import requests
from app.core.config import settings

class AIService:
    @staticmethod
    def generate_response(prompt: str, history: list = None) -> str:
        """
        Llama a la API de Groq para obtener una respuesta del LLM.
        """
        if not settings.GROQ_API_KEY:
            return "Error: GROQ_API_KEY no configurada. Obtenla gratis en https://console.groq.com/"

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Preparar mensajes para el formato ChatCompletion
        messages = [
            {"role": "system", "content": "Eres un asistente virtual útil y profesional. Responde de forma clara y concisa en español."}
        ]
        
        if history:
            for msg in history[-10:]: # Enviamos más contexto ya que Groq lo soporta bien
                role = "assistant" if msg["sender_type"] == "ai" else "user"
                messages.append({"role": role, "content": msg["content"]})
        
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": settings.GROQ_MODEL,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 1024
        }

        try:
            response = requests.post(url, headers=headers, json=payload, timeout=20)
            if response.status_code != 200:
                print(f"Error de Groq ({response.status_code}): {response.text}") # Esto saldrá en tu terminal
                return f"Error en la IA: {response.json().get('error', {}).get('message', 'Error desconocido')}"
            
            result = response.json()
            if "choices" in result and len(result["choices"]) > 0:
                return result["choices"][0]["message"]["content"]
            return "Error: No se recibió contenido de la IA."
            
        except Exception as e:
            print(f"Error calling Groq API: {e}")
            return f"Lo siento, hubo un error al conectar con Groq: {str(e)}"

ai_service = AIService()
