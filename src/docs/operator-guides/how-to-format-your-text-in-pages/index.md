---
title: How to format your text in Pages with Markdown
slug: how-to-format-your-text-in-pages
updated: 2023-01-17
category: operator-guides
ingress:
  Learn how to use Markdown to change your marketplace content pages.
published: false
---

Pages lets you create and modify your marketplace’s content pages. The text in these pages can be formatted using Markdown. This guide provides an introduction to Markdown to help you use it when formatting your content pages. 


## What is Markdown

Markdown is a simple programming language used to add formatting to text. If you want to emphasize a part of the content of your Pages, you can do so by formatting the text of your sections and blocks. Markdown in essence adds basic formatting tags to the underlying code of your page. It doesn’t do anything fancy like changing the font size, font color, or font family — but it covers the essentials, using simple keyboard symbols.

The Pages feature uses a modified version of Markdown syntax. It allows you to add bold, italics, links, lists, headers, images, code and quotation blocks to the content text. You can add markdown in blocks description and sections ingress. Markdown doesn’t work in section titles or block titles.


## Highlighting

You can highlight the text with italics, bold or a combination of both. You can do so by adding asterisks or underlines to the text. See the examples for reference:

This is \*italic text\* and this is also \_italics text\_
This is *italic text* and this is also _italics text_

This is \*\*bold text\*\* and this is also \_\_bold text\_\_
This is **bold text** and this is also __bold text__

This is \*\*\*bold and italics text\*\*\* and so \_\_\_is this text\_\_\_
This is ***bold and italics text*** and so ___is this text___


## Headers

You can add different levels of headers by adding hashes to the beginning of the text. The number of hash signs determines the heading level: 

\# h1 Heading
\#\# h2 Heading
\### h3 Heading
\#### h4 Heading
\##### h5 Heading
\###### h6 Heading



## Link

You can add links to the text by adding square brackets, followed by the link in parenthesis: 

Here is \[a link to Sharetribe’s site\]\(https://www.sharetribe.com)  
You can also turn a URL or an email address into a link by surrounding it with <> like \<https://www.sharetribe.com> or \<hello@sharetribe.com> 


## Lists

You can create ordered or unordered lists. 

To create unordered lists you can use different symbols: plus signs, dashes or asterisks. 

```
- Product
- Service 
- Rental
* Product
* Service 
* Rental
+ Product
+ Service 
+ Rental
```

To create ordered lists you can use numbers. The first number of the list will determine the starting number of the rendered version of the list. The other numbers do not matter.

1. First item
2. Second item
3. Third item
---
1. First item
1. Second item
1. Third item
---
43. First item
1. Second item
2. Third item


You can also have indented lists by adding four spaces before the list item

- Product
- Service 
- Rental
    - Sauna rental
    - Home rental
- Mixed
---
1. First item
2. Second item
3. Third item
    1. First indented item
    2. Second indented item
  

 


## Image

You can add images to your sections within the Pages editor. However, if you want to add images within the text. You can do it with Markdown. The format for the image would be: 

\!\[Alt text\]\(https://picsum.photos/400)

You first need to add an exclamation mark, then the Alt text of the image in square brackets, and finally the link to the image in parenthesis. You will notice that it is identical to the link format but with an added exclamation mark.



## Quotation blocks

You can add quotation blocks to your content by adding the greater than sign (>) before a paragraph: 

\> This is a quotation paragraph

You can also create nested quotation blocks

\> Blockquotes can also be nested...
\>> ...by stacking greater-than signs...
\> > > ...or with spaces between arrows.

Lastly, you can use most other formatting symbols inside quotations, in order to create more complex quotation blocks:

\> ## This is a header (H2)
\> 
\> Blockquotes can contain other Markdown elements, including headers, lists, and code blocks
\>
\> 1.   This is the first list item.
\> 2.   This is the second list item.
\> 
\> Here's some example code:
\> 
\>     export default PageBuilder;


## Code blocks 

You can add code blocks to your content. Most marketplaces will not need to add code blocks for coding-related reasons, however, code blocks and code formatting are effective methods for highlighting text.

You can create inline code by using backticks. For example 

This is an inline \`code\` `code`

You can create blocks of code by using backtick fences which is code surrounded by three backticks (\`\`\`). For example: 

\`\`\`
This is a block of code
Line 1
Line 2
Line 3
\`\`\`

## Horizontal separation line (horizontal rule)

You can divide the text with a horizontal line by adding 3 dashes, 3 asterisks or 3 dashes

## Escaping markdown and other limitations

You can “escape” automatic formatting, by adding a backspace (\) before the asterisk, hashes, dashes and other symbols used in markdown. This will allow you to display the symbol in the rendered page, instead of it triggering a specific formatting rule. 
 
There are formatting limitations with Markdown. Line breaks are particularly tricky. No matter how many spaces you add in between paragraphs, the paragraphs will always be separated by the same amount of space. 

There are a few additional supported formatting rules with Markdown that would allow you to create the same results as above, but with different symbols. This article doesn’t cover those cases to allow for simpler usage definitions. 


Finally, Pages support a lot of the Markdown syntax, but not everything. If you want to learn more about Markdown syntax, you can visit the official [Markdown documentation](https://daringfireball.net/projects/markdown/syntax) or the [Markdown extended syntax guide](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks).