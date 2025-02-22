import ollama

response = ollama.chat(model="mistral", messages=[
    {"role": "system", "content": "You are a motivator trying to get the user to complete their tasks"},
    {"role": "user", "content": "I havent' done any tasks today"}
])

print(response['message']['content'])
