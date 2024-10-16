---
title: Page asset schema
slug: page-asset-schema
updated: 2023-10-24
category: references
ingress:
  Reference documentation providing information on the page asset
  schema.
published: true
---

## What is a page asset schema

Page [assets](/references/assets/) in Sharetribe have a structure that
is defined by the page asset schema. The Sharetribe page asset schema is
based on [JSON schema](https://json-schema.org/).

If you are not familiar with the JSON schema, you can learn more in the
[Understanding JSON schema](https://json-schema.org/understanding-json-schema/)
ebook.

<info>

It is good to note that the content page asset schema is not the same as
a [website structured data schema](https://schema.org/):

- Sharetribe page asset schema is a Sharetribe-specific description of
  the data being returned from
  [Sharetribe Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
- Schema.org structured data schema is a general vocabulary for
  representing the data content of a page in a way that is easily
  readable by e.g. search engines. <br/>

Page asset schema is also distinct from an
[extended data search schema](/references/extended-data/#search-schema):

- Page asset schema relates to page assets created by operators through
  Sharetribe Console. It enables building client applications that can
  predictably handle page asset data.
- Extended data search schema relates to listings or users. It enables
  searching and filtering users and listings through the Sharetribe APIs
  on the marketplace.

</info>
  
The page asset schema determines the structure of the page in both Sharetribe Console and the page asset fetched from Asset Delivery API.
- The page is created and modified in Sharetribe Console, structured by the page asset schema
- The page asset is then fetched to the client, and the data structure for all pages can be predicted based on the page asset schema.

![Page asset schema in context](./page-schema-context.png)

## Page asset schema syntax: properties and \$defs

The page asset schema itself has two main parts:

- properties
- \$defs

Properties describe the main structure of the page asset, whereas \$defs
contain subschemas. Subschemas are additional attributes that can be
reused in several properties.

- Read more about
  [defs in JSON schema](https://json-schema.org/understanding-json-schema/structuring.html#defs)

For instance, a page section's call to action has an optional internal
button link. In the schema, the _fieldType_ attribute determines whether
the section has a call to action, and whether it is an internal link or
an external link.

The schema then determines that if _fieldType_ is required and is
defined as internal button link, the relevant additional attributes are
added to _callToAction_ .

```json
{
  "callToAction": {
    "type": "object",
    "properties": {
      "fieldType": {
        "title": "Section call to action",
        "type": "string",
        "default": "none",
        "description": "The action the user is prompted to take after viewing the section.",
        "oneOf": [
          {
            "$ref": "#/$defs/fieldType/none",
            "title": "No call to action"
          },
          {
            "$ref": "#/$defs/fieldType/internalButtonLink",
            "title": "Internal link",
            "description": "Link to a page in your marketplace. Displayed as a button."
          },
          {
            "$ref": "#/$defs/fieldType/externalButtonLink",
            "title": "External link",
            "description": "Link to a page outside your marketplace. Opens in a new tab. Displayed as a button."
          }
        ]
      }
    },
    "allOf": [
      {
        "if": {
          "properties": {
            "fieldType": {
              "$ref": "#/$defs/fieldType/internalButtonLink"
            }
          },
          "required": ["fieldType"]
        },
        "then": {
          "$ref": "#/$defs/internalButtonLink"
        }
      }
    ]
  }
}
```

The definitions for _fieldType/internalButtonLink_ and
_internalButtonLink_ can be found in _\$defs_.

```json
{
"$defs": {
  "fieldType": {
    "none": {
      "const": "none"
    },
    "internalButtonLink": {
      "const": "internalButtonLink"
    }
  },
  "internalButtonLink": {
    "properties": {
      "content": {
        "title": "Internal link text",
        "type": "string",
        "minLength": 1
      },
      "href": {
        "description": "Include only the path after your domain. For example, if you want to link to your About page, use /p/about.",
        "title": "Internal link address",
        "type": "string",
        "examples": [
          "#section-id-as-anchor",
          "/absolute/path/to/page"
        ],
        "pattern": "^(?![a-zA-Z][a-zA-Z\\+\\.\\-]*\\:)",
        "minLength": 1
      }
    },
    "required": [
      "content",
      "href"
    ]
  }
}
```

For a page asset section where _callToAction.fieldType_ is internal
button link, _callToAction_ will also have the properties defined in
_internalButtonLink_.

![Call to action with internal button](./internal-button-cta.png)

## Using page asset schema when building a client

Since the page asset schema defines the structure of the page asset, any
client applications need to be built so that they can handle all
situations where the data is valid according to the schema. For
instance, required attributes are explicitly defined in the schema, so
all other attributes should be considered optional.

For instance:

- _sectionId_ is required, and has a minimum length of 1. Client apps
  can expect all sections to have a _sectionId_ string of 1 or more
  characters.
- _section.title_ is not required. Client apps can expect
  _section.title_ to be an object, or _null_.
- _section.title.content_ is not required. Clients can expect
  _section.title.content_ to be a string with 1 or more characters, or
  an empty string, or _null_.

<info>

The schema is subject to change, in the sense that new properties may be
introduced as time goes on, so client implementations should be able to
handle those situations.

</info>

## Full page asset schema

You can download the full page asset schema here:

- [page-asset-schema.json](./page-asset-schema.json)

The representation below shows the page asset schema without _\_editor_
attributes, which are only used in Sharetribe Console internally and are
subject to change.

```json
{
  "type": "object",
  "properties": {
    "meta": {
      "title": "SEO & Social",
      "type": "object",
      "description": "Tell search engines and social media platforms how they should present your page in search results and posts.\n\n[Watch a video](https://www.youtube.com/watch?v=W7CocGvm7RI) | [Learn more about editing meta tags](https://www.sharetribe.com/help/en/articles/8411140-how-to-edit-seo-and-social-metadata-tags)",
      "properties": {
        "pageTitle": {
          "type": "object",
          "properties": {
            "fieldType": {
              "const": "metaTitle",
              "default": "metaTitle"
            },
            "content": {
              "type": "string",
              "maxLength": 255,
              "title": "Page title",
              "description": "The page title in search engines and browser tabs. Recommended length: 50–60 characters."
            }
          }
        },
        "pageDescription": {
          "type": "object",
          "properties": {
            "fieldType": {
              "default": "metaDescription",
              "const": "metaDescription"
            },
            "content": {
              "type": "string",
              "title": "Page description",
              "description": "A summary of the page content for search engines. Recommended length: 50-160 characters."
            }
          }
        },
        "socialSharing": {
          "type": "object",
          "properties": {
            "fieldType": {
              "const": "openGraphData",
              "default": "openGraphData"
            },
            "title": {
              "type": "string",
              "title": "Page title for social media",
              "description": "The page title in social media shares and links. Recommended length: 50–60 characters."
            },
            "description": {
              "type": "string",
              "title": "Page description for social media",
              "description": "A summary of the page content for social media shares and links. Recommended length: 50-160 characters."
            },
            "image": {
              "title": "Page image for social media",
              "type": "object",
              "description": "The page image in social media shares and links. Recommended aspect ratio: 1.91:1. Recommended minimum size: 1200x630 pixels. Maximum image size: 20MB.",
              "properties": {
                "_ref": {
                  "type": "object",
                  "properties": {
                    "resolver": {
                      "const": "image"
                    },
                    "target": {
                      "type": "string"
                    },
                    "params": {
                      "const": {
                        "variants": {
                          "social600": {
                            "width": 600,
                            "height": 600,
                            "fit": "scale"
                          },
                          "social1200": {
                            "width": 1200,
                            "height": 1200,
                            "fit": "scale"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "sections": {
      "title": "Sections",
      "description": "Build a content page out of sections and content blocks. Determine the section layout, color, and appearance. Add titles, descriptions, call-to-action buttons, block text, images, and video.\n\n[Watch a video](https://www.youtube.com/watch?v=nZ8YtfZ_5n0&t=124s) | [Learn more about editing content pages](https://www.sharetribe.com/help/en/articles/8387209-how-to-edit-a-content-page)",
      "type": "array",
      "maxItems": 20,
      "items": {
        "title": "Section details",
        "type": "object",
        "properties": {
          "sectionName": {
            "type": "string",
            "title": "Section name",
            "description": "The section name is only shown in Console. It helps you remember what the section is about."
          },
          "sectionId": {
            "_errors": {
              "pattern": "You've added characters that are not allowed."
            },
            "description": "Use an anchor link ID to link directly to a section. Example: www.example.com/p/page_id#anchor-link-id. Use lowercase characters, numbers, dashes (-) or underscores (_), and no spaces.",
            "type": "string",
            "title": "Anchor link ID",
            "pattern": "(^$)|^[a-z][a-z0-9_\\-]*$"
          },
          "sectionType": {
            "description": "Determines the section layout. [Learn more about section templates.](https://www.sharetribe.com/help/en/articles/8387253-what-are-section-templates)",
            "type": "string",
            "title": "Section template",
            "oneOf": [
              {
                "const": "hero",
                "title": "Hero",
                "description": "No content blocks. Consists of a title, description, and button."
              },
              {
                "const": "article",
                "title": "Article",
                "description": "Content blocks stacked vertically, optimized for reading."
              },
              {
                "const": "carousel",
                "title": "Carousel",
                "description": "Content blocks placed horizontally. 1-4 blocks are visible at a time and the rest can be revealed by swiping or scrolling."
              },
              {
                "const": "columns",
                "title": "Columns",
                "description": "Content blocks in a grid of 1, 2, 3, or 4 columns."
              },
              {
                "const": "features",
                "title": "Features",
                "description": "Content blocks stacked vertically, with text and media side by side in an alternating order."
              }
            ]
          },
          "title": {
            "type": "object",
            "properties": {
              "content": {
                "title": "Section title",
                "type": "string"
              },
              "fieldType": {
                "title": "Section title size",
                "type": "string",
                "default": "heading2",
                "oneOf": [
                  {
                    "$ref": "#/$defs/fieldType/heading1",
                    "title": "Page title (H1)"
                  },
                  {
                    "$ref": "#/$defs/fieldType/heading2",
                    "title": "Section title (H2)"
                  }
                ]
              }
            }
          },
          "description": {
            "type": "object",
            "properties": {
              "fieldType": {
                "title": "Section description",
                "type": "string",
                "default": "paragraph",
                "$ref": "#/$defs/fieldType/paragraph"
              },
              "content": {
                "title": "Section description",
                "type": "string"
              }
            }
          },
          "callToAction": {
            "type": "object",
            "properties": {
              "fieldType": {
                "title": "Section call to action",
                "type": "string",
                "default": "none",
                "description": "The action you want a user to take after viewing the section.",
                "oneOf": [
                  {
                    "$ref": "#/$defs/fieldType/none",
                    "title": "No call to action"
                  },
                  {
                    "$ref": "#/$defs/fieldType/internalButtonLink",
                    "title": "Internal link",
                    "description": "A button link to a page in your marketplace."
                  },
                  {
                    "$ref": "#/$defs/fieldType/externalButtonLink",
                    "title": "External link",
                    "description": "A button link to a page outside your marketplace. Opens in a new tab."
                  }
                ]
              }
            },
            "allOf": [
              {
                "if": {
                  "properties": {
                    "fieldType": {
                      "$ref": "#/$defs/fieldType/internalButtonLink"
                    }
                  },
                  "required": ["fieldType"]
                },
                "then": {
                  "$ref": "#/$defs/internalButtonLink"
                }
              },
              {
                "if": {
                  "properties": {
                    "fieldType": {
                      "$ref": "#/$defs/fieldType/externalButtonLink"
                    }
                  },
                  "required": ["fieldType"]
                },
                "then": {
                  "$ref": "#/$defs/externalButtonLink"
                }
              }
            ]
          },
          "appearance": {
            "type": "object",
            "properties": {
              "fieldType": {
                "title": "Section appearance",
                "type": "string",
                "default": "defaultAppearance",
                "oneOf": [
                  {
                    "$ref": "#/$defs/fieldType/defaultAppearance",
                    "title": "Default"
                  },
                  {
                    "$ref": "#/$defs/fieldType/customAppearance",
                    "title": "Custom",
                    "description": "Customize background color, background image, and text color."
                  }
                ]
              }
            },
            "if": {
              "properties": {
                "fieldType": {
                  "const": "customAppearance"
                }
              },
              "required": ["fieldType"]
            },
            "then": {
              "properties": {
                "backgroundColor": {
                  "title": "Background color",
                  "description": "Displayed if the section doesn't have a background image.",
                  "type": "string",
                  "pattern": "^#[A-Fa-f0-9]{6}"
                },
                "backgroundImage": {
                  "title": "Background image",
                  "type": "object",
                  "description": "Minimum image dimensions for the best results: 1600x1200px. Maximum image size: 20MB.",
                  "properties": {
                    "_ref": {
                      "type": "object",
                      "properties": {
                        "resolver": {
                          "const": "image"
                        },
                        "target": {
                          "type": "string"
                        },
                        "params": {
                          "$ref": "#/$defs/imageParams/scaled"
                        }
                      }
                    }
                  }
                },
                "backgroundImageOverlay": {
                  "type": "object",
                  "properties": {
                    "preset": {
                      "title": "Background image overlay",
                      "description": "You can make the image darker to make the text easier to read.",
                      "type": "string",
                      "default": "none",
                      "oneOf": [
                        {
                          "const": "none",
                          "title": "No overlay"
                        },
                        {
                          "const": "dark",
                          "title": "Dark overlay"
                        },
                        {
                          "const": "darker",
                          "title": "Darker overlay"
                        }
                      ]
                    }
                  },
                  "allOf": [
                    {
                      "if": {
                        "properties": {
                          "preset": {
                            "const": "dark"
                          }
                        },
                        "required": ["preset"]
                      },
                      "then": {
                        "properties": {
                          "color": {
                            "type": "string",
                            "const": "#000000"
                          },
                          "opacity": {
                            "type": "number",
                            "const": 0.3
                          }
                        },
                        "required": ["color", "opacity"]
                      }
                    },
                    {
                      "if": {
                        "properties": {
                          "preset": {
                            "const": "darker"
                          }
                        },
                        "required": ["preset"]
                      },
                      "then": {
                        "properties": {
                          "color": {
                            "type": "string",
                            "const": "#000000"
                          },
                          "opacity": {
                            "type": "number",
                            "const": 0.5
                          }
                        },
                        "required": ["color", "opacity"]
                      }
                    }
                  ],
                  "required": ["preset"]
                },
                "textColor": {
                  "title": "Text color",
                  "type": "string",
                  "default": "black",
                  "oneOf": [
                    {
                      "const": "black",
                      "title": "Black"
                    },
                    {
                      "const": "white",
                      "title": "White"
                    }
                  ]
                }
              },
              "required": ["backgroundImageOverlay"]
            }
          }
        },
        "allOf": [
          {
            "if": {
              "properties": {
                "sectionType": {
                  "enum": ["columns", "carousel", "article", "features"]
                }
              },
              "required": ["sectionType"]
            },
            "then": {
              "properties": {
                "blocks": {
                  "title": "Content Blocks",
                  "type": "array",
                  "maxItems": 20,
                  "items": {
                    "type": "object",
                    "properties": {
                      "blockName": {
                        "type": "string",
                        "title": "Block name",
                        "description": "The block name is only shown in Console. It helps you remember what the block is about."
                      },
                      "blockId": {
                        "_errors": {
                          "pattern": "You've added characters that are not allowed."
                        },
                        "description": "Use an anchor link ID to link directly to a block. Example: www.example.com/p/page_id#anchor-link-id. Use lowercase characters, numbers, dashes (-) or underscores (_), and no spaces.",
                        "type": "string",
                        "title": "Anchor link ID",
                        "pattern": "(^$)|^[a-z][a-z0-9_\\-]*$"
                      },
                      "blockType": {
                        "title": "Block type",
                        "const": "defaultBlock",
                        "$comment": "Currently, we only have one block type but in the future there could be many"
                      },
                      "media": {
                        "type": "object",
                        "properties": {
                          "fieldType": {
                            "title": "Block media",
                            "type": "string",
                            "default": "none",
                            "oneOf": [
                              {
                                "$ref": "#/$defs/fieldType/none",
                                "title": "No media"
                              },
                              {
                                "$ref": "#/$defs/fieldType/image",
                                "title": "Image"
                              },
                              {
                                "$ref": "#/$defs/fieldType/youtube",
                                "title": "YouTube video"
                              }
                            ]
                          }
                        },
                        "allOf": [
                          {
                            "if": {
                              "properties": {
                                "fieldType": {
                                  "$ref": "#/$defs/fieldType/image"
                                }
                              }
                            },
                            "then": {
                              "properties": {
                                "image": {
                                  "title": "Image file",
                                  "type": "object",
                                  "description": "Sharetribe supports most common image formats. Maximum image size: 20MB.",
                                  "properties": {
                                    "_ref": {
                                      "type": "object",
                                      "properties": {
                                        "resolver": {
                                          "const": "image"
                                        },
                                        "target": {
                                          "type": "string"
                                        }
                                      },
                                      "required": ["resolver", "target"]
                                    }
                                  },
                                  "required": ["_ref"]
                                },
                                "aspectRatio": {
                                  "$ref": "#/$defs/aspectRatio"
                                },
                                "alt": {
                                  "description": "A short description of the image for accessibility and search engines.",
                                  "title": "Image alt text",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "link": {
                                  "__features": [
                                    "clickable-block-image",
                                    {
                                      "type": "object",
                                      "properties": {
                                        "fieldType": {
                                          "title": "Block image link",
                                          "type": "string",
                                          "default": "none",
                                          "oneOf": [
                                            {
                                              "$ref": "#/$defs/fieldType/none",
                                              "title": "No link"
                                            },
                                            {
                                              "$ref": "#/$defs/fieldType/internalImageLink",
                                              "title": "Internal link",
                                              "description": "A link to a page in your marketplace."
                                            },
                                            {
                                              "$ref": "#/$defs/fieldType/externalImageLink",
                                              "title": "External link",
                                              "description": "A link to a page outside your marketplace. Opens in a new tab."
                                            }
                                          ]
                                        }
                                      },
                                      "allOf": [
                                        {
                                          "if": {
                                            "properties": {
                                              "fieldType": {
                                                "$ref": "#/$defs/fieldType/internalImageLink"
                                              }
                                            },
                                            "required": ["fieldType"]
                                          },
                                          "then": {
                                            "$ref": "#/$defs/internalImageLink"
                                          }
                                        },
                                        {
                                          "if": {
                                            "properties": {
                                              "fieldType": {
                                                "$ref": "#/$defs/fieldType/externalImageLink"
                                              }
                                            },
                                            "required": ["fieldType"]
                                          },
                                          "then": {
                                            "$ref": "#/$defs/externalImageLink"
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                }
                              },
                              "required": [
                                "alt",
                                "image",
                                "aspectRatio"
                              ],
                              "allOf": [
                                {
                                  "if": {
                                    "properties": {
                                      "aspectRatio": {
                                        "const": "1/1"
                                      }
                                    },
                                    "required": ["aspectRatio"]
                                  },
                                  "then": {
                                    "properties": {
                                      "image": {
                                        "properties": {
                                          "_ref": {
                                            "properties": {
                                              "params": {
                                                "type": "object",
                                                "$ref": "#/$defs/imageParams/square"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  "if": {
                                    "properties": {
                                      "aspectRatio": {
                                        "const": "16/9"
                                      }
                                    },
                                    "required": ["aspectRatio"]
                                  },
                                  "then": {
                                    "properties": {
                                      "image": {
                                        "properties": {
                                          "_ref": {
                                            "properties": {
                                              "params": {
                                                "type": "object",
                                                "$ref": "#/$defs/imageParams/landscape"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  "if": {
                                    "properties": {
                                      "aspectRatio": {
                                        "const": "2/3"
                                      }
                                    },
                                    "required": ["aspectRatio"]
                                  },
                                  "then": {
                                    "properties": {
                                      "image": {
                                        "properties": {
                                          "_ref": {
                                            "properties": {
                                              "params": {
                                                "type": "object",
                                                "$ref": "#/$defs/imageParams/portrait"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  "if": {
                                    "properties": {
                                      "aspectRatio": {
                                        "const": "auto"
                                      }
                                    },
                                    "required": ["aspectRatio"]
                                  },
                                  "then": {
                                    "properties": {
                                      "image": {
                                        "properties": {
                                          "_ref": {
                                            "properties": {
                                              "params": {
                                                "type": "object",
                                                "$ref": "#/$defs/imageParams/original"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "fieldType": {
                                  "$ref": "#/$defs/fieldType/youtube"
                                }
                              }
                            },
                            "then": {
                              "properties": {
                                "youtubeVideoId": {
                                  "_errors": {
                                    "pattern": "YouTube video ID must contain only letters and numbers and _ or - characters."
                                  },
                                  "description": "The part of a YouTube link after \"watch?v=\". For example, for the video youtube.com/watch?v=UffchBUUIoI, the ID is UffchBUUIoI.",
                                  "type": "string",
                                  "title": "YouTube video ID",
                                  "pattern": "^[0-9A-Za-z_-]+$"
                                },
                                "aspectRatio": {
                                  "$ref": "#/$defs/aspectRatio"
                                }
                              },
                              "required": [
                                "youtubeVideoId",
                                "aspectRatio"
                              ]
                            }
                          }
                        ]
                      },
                      "title": {
                        "type": "object",
                        "properties": {
                          "content": {
                            "title": "Block title",
                            "type": "string"
                          },
                          "fieldType": {
                            "type": "string",
                            "title": "Block title size",
                            "default": "heading3",
                            "oneOf": [
                              {
                                "$ref": "#/$defs/fieldType/heading1",
                                "title": "Page title (H1)"
                              },
                              {
                                "$ref": "#/$defs/fieldType/heading2",
                                "title": "Section title (H2)"
                              },
                              {
                                "$ref": "#/$defs/fieldType/heading3",
                                "title": "Section subtitle (H3)"
                              }
                            ]
                          }
                        }
                      },
                      "text": {
                        "type": "object",
                        "properties": {
                          "fieldType": {
                            "type": "string",
                            "title": "Text element type",
                            "default": "markdown",
                            "$ref": "#/$defs/fieldType/markdown"
                          },
                          "content": {
                            "title": "Block text",
                            "type": "string",
                            "description": "You can format text with markdown. [Learn more about markdown.](https://www.sharetribe.com/help/en/articles/8404687-how-to-format-your-text-in-pages-with-markdown)"
                          }
                        }
                      },
                      "callToAction": {
                        "type": "object",
                        "properties": {
                          "fieldType": {
                            "title": "Block call to action",
                            "type": "string",
                            "default": "none",
                            "description": "The action you want a user to take after viewing the block.",
                            "oneOf": [
                              {
                                "$ref": "#/$defs/fieldType/none",
                                "title": "No call to action"
                              },
                              {
                                "$ref": "#/$defs/fieldType/internalButtonLink",
                                "title": "Internal link",
                                "description": "A button link to a page in your marketplace."
                              },
                              {
                                "$ref": "#/$defs/fieldType/externalButtonLink",
                                "title": "External link",
                                "description": "A button link to a page outside your marketplace. Opens in a new tab."
                              }
                            ]
                          }
                        },
                        "allOf": [
                          {
                            "if": {
                              "properties": {
                                "fieldType": {
                                  "$ref": "#/$defs/fieldType/internalButtonLink"
                                }
                              },
                              "required": ["fieldType"]
                            },
                            "then": {
                              "$ref": "#/$defs/internalButtonLink"
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "fieldType": {
                                  "$ref": "#/$defs/fieldType/externalButtonLink"
                                }
                              },
                              "required": ["fieldType"]
                            },
                            "then": {
                              "$ref": "#/$defs/externalButtonLink"
                            }
                          }
                        ]
                      },
                      "alignment": {
                        "__features": [
                          "block-alignment",
                          {
                            "title": "Block content alignment",
                            "type": "string",
                            "default": "left",
                            "oneOf": [
                              {
                                "const": "left",
                                "title": "Align content left"
                              },
                              {
                                "const": "center",
                                "title": "Center content"
                              },
                              {
                                "const": "right",
                                "title": "Align content right"
                              }
                            ]
                          }
                        ]
                      }
                    },
                    "required": ["blockType"]
                  }
                }
              }
            }
          },
          {
            "if": {
              "anyOf": [
                {
                  "properties": {
                    "sectionType": {
                      "const": "columns"
                    }
                  },
                  "required": ["sectionType"]
                },
                {
                  "properties": {
                    "sectionType": {
                      "const": "carousel"
                    }
                  },
                  "required": ["sectionType"]
                }
              ]
            },
            "then": {
              "properties": {
                "numColumns": {
                  "title": "Number of columns",
                  "type": "integer",
                  "oneOf": [
                    {
                      "const": 1,
                      "title": "1"
                    },
                    {
                      "const": 2,
                      "title": "2"
                    },
                    {
                      "const": 3,
                      "title": "3"
                    },
                    {
                      "const": 4,
                      "title": "4"
                    }
                  ]
                }
              },
              "required": ["numColumns"]
            }
          }
        ],
        "required": ["sectionType"]
      }
    }
  },
  "$defs": {
    "fieldType": {
      "youtube": {
        "const": "youtube"
      },
      "internalButtonLink": {
        "const": "internalButtonLink"
      },
      "internalImageLink": {
        "const": "internalImageLink"
      },
      "none": {
        "const": "none"
      },
      "defaultAppearance": {
        "const": "defaultAppearance"
      },
      "heading1": {
        "const": "heading1"
      },
      "image": {
        "const": "image"
      },
      "heading3": {
        "const": "heading3"
      },
      "externalButtonLink": {
        "const": "externalButtonLink"
      },
      "externalImageLink": {
        "const": "externalImageLink"
      },
      "heading2": {
        "const": "heading2"
      },
      "customAppearance": {
        "const": "customAppearance"
      },
      "paragraph": {
        "const": "paragraph"
      },
      "markdown": {
        "const": "markdown"
      }
    },
    "internalButtonLink": {
      "properties": {
        "content": {
          "title": "Internal link text",
          "type": "string",
          "minLength": 1
        },
        "href": {
          "_errors": {
            "pattern": "This field should not include protocol like https."
          },
          "description": "Include only the path after your domain. For example, if you want to link to your About page, use \"/p/about\", or if you want to link to your landing page, use \"/\".",
          "title": "Internal link address",
          "type": "string",
          "examples": [
            "#section-id-as-anchor",
            "/absolute/path/to/page"
          ],
          "pattern": "^(?![a-zA-Z][a-zA-Z+.-]*:)",
          "minLength": 1
        }
      },
      "required": ["content", "href"]
    },
    "externalButtonLink": {
      "properties": {
        "content": {
          "title": "External link text",
          "type": "string",
          "minLength": 1
        },
        "href": {
          "_errors": {
            "pattern": "The address doesn't start with https://."
          },
          "description": "The external link address should begin with https://.",
          "title": "External link address",
          "type": "string",
          "examples": ["http:", "https:"],
          "pattern": "^(http|https):",
          "minLength": 1
        }
      },
      "required": ["content", "href"]
    },
    "internalImageLink": {
      "properties": {
        "href": {
          "_errors": {
            "pattern": "This field should not include protocol like https."
          },
          "description": "Include only the path after your domain. For example, if you want to link to your About page, use \"/p/about\", or if you want to link to your landing page, use \"/\".",
          "title": "Internal link address",
          "type": "string",
          "examples": [
            "#section-id-as-anchor",
            "/absolute/path/to/page"
          ],
          "pattern": "^(?![a-zA-Z][a-zA-Z+.-]*:)",
          "minLength": 1
        }
      },
      "required": ["href"]
    },
    "externalImageLink": {
      "properties": {
        "href": {
          "_errors": {
            "pattern": "The address doesn't start with https://."
          },
          "description": "The external link address should begin with https://.",
          "title": "External link address",
          "type": "string",
          "examples": ["http:", "https:"],
          "pattern": "^(http|https):",
          "minLength": 1
        }
      },
      "required": ["href"]
    },
    "imageParams": {
      "scaled": {
        "const": {
          "variants": {
            "scaled800": {
              "width": 800,
              "height": 800,
              "fit": "scale"
            },
            "scaled1200": {
              "width": 1200,
              "height": 1200,
              "fit": "scale"
            },
            "scaled2400": {
              "width": 2400,
              "height": 2400,
              "fit": "scale"
            }
          }
        }
      },
      "square": {
        "const": {
          "variants": {
            "square400": {
              "width": 400,
              "height": 400,
              "fit": "crop"
            },
            "square800": {
              "width": 800,
              "height": 800,
              "fit": "crop"
            },
            "square1200": {
              "width": 1200,
              "height": 1200,
              "fit": "crop"
            },
            "square2400": {
              "width": 2400,
              "height": 2400,
              "fit": "crop"
            }
          }
        }
      },
      "landscape": {
        "const": {
          "variants": {
            "landscape400": {
              "width": 400,
              "height": 225,
              "fit": "crop"
            },
            "landscape800": {
              "width": 800,
              "height": 450,
              "fit": "crop"
            },
            "landscape1200": {
              "width": 1200,
              "height": 675,
              "fit": "crop"
            },
            "landscape2400": {
              "width": 2400,
              "height": 1350,
              "fit": "crop"
            }
          }
        }
      },
      "portrait": {
        "const": {
          "variants": {
            "portrait400": {
              "width": 400,
              "height": 600,
              "fit": "crop"
            },
            "portrait800": {
              "width": 800,
              "height": 1200,
              "fit": "crop"
            },
            "portrait1200": {
              "width": 1200,
              "height": 1800,
              "fit": "crop"
            },
            "portrait2400": {
              "width": 2400,
              "height": 3600,
              "fit": "crop"
            }
          }
        }
      },
      "original": {
        "const": {
          "variants": {
            "original400": {
              "width": 400,
              "height": 400,
              "fit": "scale"
            },
            "original800": {
              "width": 800,
              "height": 800,
              "fit": "scale"
            },
            "original1200": {
              "width": 1200,
              "height": 1200,
              "fit": "scale"
            },
            "original2400": {
              "width": 2400,
              "height": 2400,
              "fit": "scale"
            }
          }
        }
      }
    },
    "aspectRatio": {
      "title": "Aspect ratio",
      "type": "string",
      "default": "auto",
      "oneOf": [
        {
          "const": "1/1",
          "title": "Square (1:1)"
        },
        {
          "const": "16/9",
          "title": "Landscape (16:9)"
        },
        {
          "const": "2/3",
          "title": "Portrait (2:3)"
        },
        {
          "const": "auto",
          "title": "Original"
        }
      ]
    }
  }
}
```
