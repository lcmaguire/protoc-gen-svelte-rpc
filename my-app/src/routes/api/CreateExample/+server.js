import { ExampleServiceClient } from '$lib/client/ExampleService';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    console.log( "in request")
    console.log( request.body)
    let a = await request.json()
    console.log( "json awaited")
    console.log(a)

    let response = await ExampleServiceClient.createExample(a)
    console.log( "json awaited")
    console.log( "response")

    return json(response);
}