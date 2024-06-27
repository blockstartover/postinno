from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import ollama

@csrf_exempt
def analyze_code(request):
    if request.method == 'POST':
        if request.content_type == 'application/json':
            try:
                data = json.loads(request.body)
                code = data.get('code', '')
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON'}, status=400)
        else:
            code = request.POST.get('code', '')

        if not code:
            return JsonResponse({'error': 'No code provided'}, status=400)

        try:
            # Initialize Ollama client
            client = ollama.Client()
            
            # Prepare the prompt for code analysis
            prompt = f"Analyze the following code and provide insights:\n\n{code}"
            
            # Generate response using Ollama
            response = client.generate(model='codellama', prompt=prompt)
            
            # Extract the generated text
            analysis = response['response']
            
            # If it's a form submission, render a template, otherwise return JSON
            if request.content_type != 'application/json':
                return render(request, 'analyzer/result.html', {'analysis': analysis, 'code': code})
            else:
                return JsonResponse({'analysis': analysis})
        
        except ollama.ResponseError as e:
            return JsonResponse({'error': f'Ollama error: {str(e)}'}, status=500)
        except Exception as e:
            return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=500)
    
    # For GET requests, render the form
    return render(request, 'analyzer/form.html')