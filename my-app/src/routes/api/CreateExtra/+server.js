// @ts-nocheck

  import { ExampleServiceClient } from '$lib/client/ExampleService';
import { Extra } from '$lib/gen/example_pb';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let req = Extra.fromJson(await request.json())
    let response = await ExampleServiceClient.createExtra(req, {headers: request.headers})
    return json(response);
}
