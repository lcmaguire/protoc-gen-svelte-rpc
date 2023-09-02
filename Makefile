
gen:
	buf generate

run-web:
	cd my-app && npm run dev

## todo gen mock go server.

gen-mock:
	buf generate --template buf.mock-go.gen.yaml