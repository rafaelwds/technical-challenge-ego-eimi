.PHONY: start backend frontend

start: backend frontend

backend:
	@echo "🔧 Iniciando backend..."
	cd mock-server && npm install && npm run dev &

frontend:
	@echo "🚀 Iniciando aplicativo Expo..."
	cd teambrain-app && npx expo start --dev-client
