---
title: How to edit content pages in Console
slug: how-to-edit-content-pages-in-Console
updated: 2023-01-17
category: operator-guides
ingress:
  Learn how to use Pages to edit content across Landing page, informational pages, or blog pages.
published: false
---

This guide introduces how to use Pages. Pages lets you edit your marketplace’s static content pages, like your Landing page or About page. If you would like more background on the Pages feature, consult this [Introduction to Pages article](CHANGEMECHANGEMECHANGEME).

We will edit one of the 3 default static pages available in Pages: the Landing page. The landing page is perhaps the most important page of your marketplace. It is the first page that visitors see — sort of like the front door to your house. You have only a few seconds to convince new visitors that they should stay to explore your site. Your landing page needs to be appealing and present your value proposition clearly and enticingly.


## Getting started 


### For marketplaces created after 2022-12-x (PAGES RELEASE DATE) 

Log into the [Flex Console](https://flex-console.sharetribe.com/). Switch to the Demo environment. Choose the “Build” option from the top bar, then select “Content”. Go to the “Landing page” section to start editing your landing page. It is recommended to follow the steps of this article within the Demo environment. If you do this, you will be able to see changes in real time within your Demo marketplace. Otherwise, other technical steps are needed to setup your Development or Production marketplace before you can start editing your landing page. 


### For marketplaces created before 2022-12-x (PAGES RELEASE DATE) 

If you created your Flex marketplace before Pages release, you can try out Pages in your Demo environment by going to the home page of your Demo environment and clicking the "Refresh demo" button. You can then try editing them or creating new pages by navigating to "Build" and then "Content". \
 \
[SCREENSHOT] \
 \
Note that the above lets you test the Pages feature (and follow along with this tutorial), but it does not yet let you make changes to your custom marketplace’s content pages. You will need to modify your custom marketplace’s code to connect it to the new Pages feature. This developer documentation shows how to make these changes. 


### Sections, Blocks, Fields, and Section templates  {#sections-blocks-fields-and-section-templates}

Content pages in your marketplace are built using Sections, Blocks, and Fields. Section templates determine layout and content type per Section.

Your landing page consists of a set of Sections. A Section is a part of the page that takes full page width and has predetermined content inside it, in a specific layout, determined by the chosen Section template. Every Section in a content page is created and managed independently from other Sections.

The actual content of the section is stored using Fields. Examples of Fields include Title and Background Image. 

Each Section can also contain any number of Blocks. Blocks contain the information present in a Section. Each Block is made up of different fields like image, videos, titles, ingresses, texts, and buttons. 

The default landing page in a Flex marketplace Demo environment has different type of Sections that will help you get an idea of what is possible with the Pages editor. 


![alt_text](images/image1.png "image_tooltip")


These sections are just an example. You can decide to add new Sections, as well as editing or removing existing Sections. The rest of the article explains the steps to work with the Pages editor in general, which can 


## Add Sections

These are the typical steps to create a new Section:



* Define the section ID
* Select the section type
* Add text content (optional)
* Add button content (optional)
* Specify background and theme options

To add a Section, click on the “+ Add a new Section” link. 

Depending on the specific section template you might need to follow extra steps (see each section template article for clarification)


### Define the section ID 

When creating a new section you need to define the section-id, or the name of the Section. It must be unique and should be descriptive. The clearer you make it, the easier it will be to identify this section later on and edit your landing page in the future. 

Important: if you don’t select an identifier, you will not be able to save your landing page. 


### Select the Section template 

Section template determines how Blocks are laid out in your section. There are four possible layouts: 

* Articles section: Narrow one column layout optimized for reading
* Features section: Text and media are displayed side by side in alternating order
* Columns section: Display content blocks in 1,2,3 or 4 column grid
* Carousel section: Displays content in blocks that can scrolled through horizontally

________________SECTION TYPES CAROUSEL____________

The template can be modified later on, so don’t worry too much about it when testing, but bear in mind what type of content each section support. If you change the section template, you might loose some of the content. 


![alt_text](images/image2.png "image_tooltip")


Important: if you don’t select a section template, you will not be able to save your landing page.


### Add text content (Optional) 

You can add the title and ingress you want your users to see. The title will be displayed in bigger font at the top of the section. How big is determined by your title header level. H1 is slightly bigger than H2. Both also determine the HTML level header indexed by search engines. You can use the title to explain the content of the section or define a larger text that you want to highlight. 

The ingress refers to the subtitle of the section. It can be used as a short or long description for the section. These texts are optional. 

![alt_text](images/image3.png "image_tooltip")

### Add button content (Optional) 

You can add the button content next. A button allows you to add a call-to-action to your section. You can define the type of link, the text and the specific link.

* Button option: no button, internal link or external link. Set the default behaviour and validation for the button. Internal link means that the link will open in the same tab and you should add an internal folder within your marketplace. External link means that the link will open in a new tab and you need to add a complete URL.
* Button text: The text within the button. Try to make the text short and simple to engage your visitors.
* Button link: The URL or folder for the button. If it is an external link you need to add http:// or https:// to your link. If it is an internal link you can simply specify the folder within your marketplace. If you set it to “faq”, it will take your users to [https://you](https://your)rmarketplaceurl.com/faq

Adding a button in your section is optional.


### Specify background and theme

The default background is white or very light gray. The color alternates within your landing page. You can specify any other background color with the color picker or add a background image to a section. The image will always be set on top of the background. Unless your image is transparent, it will cover the background color. Your image will be expanded to fit the dimensions of the section. You can also define the section theme. The options are dark or light. If you choose dark, the entire text of the section will be dark gray. If you choose light, the text of the section will be white. The background and the theme affect the whole section, including all the blocks contained in it. 


## Add blocks (Optional) 

Every Section can be expanded by adding Blocks. You can add Blocks by clicking on the “+ Add new Block…” link at the bottom of the section. 

![alt_text](images/image4.png "image_tooltip")

Each Block needs to contain a unique Block ID. All the other fields to create a block are optional, however, they are recommended.


* Block ID: a unique identifier for each block within the section. Similar to the section id. Without this ID, you cannot save changes to your landing page. 
* Media: choose if your block features an image, Youtube video embed, or no media. 
* Text content: Title content, title size and text content. These are comparable to the text content features for the main section.
* Button content: Button type, button text and button link. These are comparable to the button content features for the main section.

The blocks are the soul of each section. Without block content, each section will be indistinguishable from the others. Once you add blocks to your section, each block will be displayed and ordered according to the type of section. There is no limit to the number of blocks that each section can have, they will be ordered according to the type of section that you determine.

You can even have sections that don’t contain the basic information of the section and instead, only display information within blocks. 


### Adding media to a Section 

You can add an image or a Youtube video as part of the content of every Block, within your pages. Depending on the Section template that you choose the image or video will be displayed in a predetermined layout. 


* Image: If you want to add an image, you need to upload the image file from your device. You also need to specify the aspect ratio of the image. The options are: Square, Portrait, Landscape and Original. You also have to define the image alt text.
* Video: If you want to add a video you need to specify the Youtube video ID (which can be found in the URL of the video or within the stats of the video). You also need to specify the Aspect ratio. The options are: Square, Portrait, Landscape and Original


### Format with markdown 

You can use [markdown](https://www.markdownguide.org/basic-syntax/) to format text in your Fields within Blocks. To learn more about the markdown supported by Pages visit our article about supported markdown. 



### Sections without blocks 

Blocks are optional. You can use any section without using blocks. You can use the basic info of the Section to create image sections or display titles or pieces of information or call to action buttons in the middle of the section. 

__________carousel with examples______________


![alt_text](images/image5.png "image_tooltip")


![alt_text](images/image6.png "image_tooltip")


![alt_text](images/image7.png "image_tooltip")


## Edit Sections

At any point you can edit your landing page by modifying the content within the default landing page’s Sections. Press on the Section ID to start editing sections. In order to save any changes to a section you need to click the “Save changes” button at the bottom of the page. We recommend editing a section at a time, to avoid an error in a section making it impossible to save changes to other sections. Bear in mind that if you don’t make changes to a section, or you make changes and then remove the changes the save button will be disabled.

As soon as you save the changes of the page, you can click the link to visit the page to check the new changes or, if you already have the page open somewhere, reload the page to see the changes. In the demo environment the changes will be reflected automatically. In the production environment it will take 5 minutes to see the changes reflected. This is due to the page’s [cache](https://en.wikipedia.org/wiki/Cache_(computing)).


### Reorder Sections and Blocks 

You can alter the order of the sections within the landing page or the blocks within a section by dragging and dropping the elements. Make sure to save your changes after altering the section content or changing the order of the elements, otherwise they won’t take effect on your live landing page. 

![alt_text](images/image8.png "image_tooltip")


![alt_text](images/image9.png "image_tooltip")



### Remove Sections or Blocks 

At any point you can remove your landing page sections and blocks by clicking on the three-dot menu on the top right corner of the section card. Bear in mind that even though the action is technically irreversible, you still need to save your landing page for the changes to take effect. If you don’t save your landing page changes, issues might arise.


![alt_text](images/image10.png "image_tooltip")


## Publish your landing page changes to Production {#publish-your-landing-page-changes-to-production}

If your marketplace is running in production, you can copy the same content from your Pages to the production environment of your marketplace. You need to click the “Copy to production…” button and then select the specific pages that you want to copy. This will transfer all the content from the current environment to your Production environment. 

The changes that you make to production will be available a few minutes after copying them to production. You do not need to save them again in your production environment. 
