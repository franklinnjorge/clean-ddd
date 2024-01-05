import { expect, test, vitest } from "vitest";
import { Slug } from "./slug";

test('Slug Test', () => {
    const slugText = 'An example title'

    const newSlug = Slug.createFromText(slugText)
    expect(newSlug.value).toEqual('an-example-title')
})