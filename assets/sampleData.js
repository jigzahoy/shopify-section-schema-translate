export const initialValue = `{
  "name": "Slideshow",
  "tag": "section",
  "class": "slideshow",
  "limit": 1,
  "settings": [
    {
      "type": "header",
      "content": "Section Header 1"
    },
    {
      "type": "paragraph",
      "content": "This section will display your brand information."
    },
    {
      "type": "text",
      "id": "title",
      "label": "Slideshow"
    },
    {
      "type": "header",
      "content": "Section Header 2"
    },
    {
      "type": "radio",
      "id": "logo_aligment",
      "label": "Logo alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "centered",
          "label": "Centered"
        }
      ],
      "default": "left"
    },
    {
      "type": "range",
      "id": "image_overlay_opacity",
      "min": 0,
      "max": 100,
      "step": 10,
      "unit": "%",
      "label": "Opacity",
      "default": 0
    }
  ],
  "max_blocks": 5,
  "blocks": [
    {
      "type": "@app"
    },
    {
      "type": "paragraph",
      "content": "This block will display your brand information."
    },
    {
      "type": "header",
      "content": "Social media icons"
    },
    {
      "name": "Slide",
      "type": "slide",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Slideshow",
      "settings": {
        "title": "Slideshow"
      },
      "blocks": [
        {
          "type": "slide"
        },
        {
          "type": "slide"
        }
      ]
    }
  ],
  "locales": {
    "en": {
      "title": "Slideshow"
    },
    "fr": {
      "title": "Diaporama"
    }
  },
  "enabled_on": {
    "templates": [
      "*"
    ],
    "groups": [
      "footer"
    ]
  }
}`;
