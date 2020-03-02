curl -X GET $1 -o config.json
curl -X POST http://$2/stream/71f0d26e-f3aa-4f04-868b-5aaf304dfe5b -H "Content-Type: application/json" -d @config.json
curl -X POST http://$2/stream/71f0d26e-f3aa-4f04-868b-5aaf304dfe5b/act -H "Content-Type: application/json" -d "{\"action\":\"start\"}"
curl -X POST http://$2/stream/71f0d26e-f3aa-4f04-868b-5aaf304dfe5b/act -H "Content-Type: application/json" -d "{\"action\":\"status\"}"

# https://raw.githubusercontent.com/cetic/helm-fadi/usecase/tsaas-seldon-mlflow/tsaas.json
# 10.134.1.198:32149/socket/71f0d26e-f3aa-4f04-868b-5aaf304dfe5b
