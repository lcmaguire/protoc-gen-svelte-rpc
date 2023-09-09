import { ExampleServiceClient } from '$lib/client/ExampleService';
import { Example } from '$lib/gen/example_pb';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let req = Example.fromJson(await request.json())
    let response = await ExampleServiceClient.createExample(req, {headers: request.headers})
    return json(response);
}