'use client';
import React, {FormEvent, useState} from 'react';
import TipTap from "@/components/TipTap";
import {Button} from "@/components/ui/button";

const Page = (props) => {
    // tiptap编辑器中的内容
    const [richText, setRichText] = useState(`
            descripte   ddd 
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
        <p>
          The focus extension adds a class to the focused node only. That enables you to add a custom styling to just that node. By default, it’ll add <code>.has-focus</code>, even to nested nodes.
        </p>
        <ul>
          <li>Nested elements (like this list item) will be focused with the default setting of <code>mode: all</code>.</li>
          <li>Otherwise the whole list will get the focus class, even when just a single list item is selected.</li>
        </ul>

        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code>for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
`)

    return (
        <div className={'m-12'}>
            <form onSubmit={(e: FormEvent) => {
                e.preventDefault()
                console.log(richText)
            }}>
                <h1 className={'font-bold mr-2 text-2xl'}>{props.params.slug}</h1>
                {/* tiptap编辑器 */}
                <TipTap
                    description={richText}
                    onChange={(text) => {
                        setRichText(text)
                    }}/>
                <Button
                    type={'submit'} className={'my-4'}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Page;