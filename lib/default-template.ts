import type { Template } from "./types"

export const defaultTemplate: Template = {
  id: "default-template",
  name: "Default Template",
  sections: [
    {
      id: "header",
      name: "Header",
      elements: [
        {
          id: "header-heading",
          type: "heading",
          content: "Welcome to Your Website",
          properties: {
            level: "h1",
            align: "center",
            color: "#333333",
            fontSize: "32px",
          },
        },
        {
          id: "header-paragraph",
          type: "paragraph",
          content: "This is a sample website created with our drag-and-drop builder. Start customizing it now!",
          properties: {
            align: "center",
            color: "#666666",
            fontSize: "16px",
          },
        },
      ],
      properties: {
        backgroundColor: "#f9f9f9",
      },
    },
    {
      id: "main-content",
      name: "Main Content",
      elements: [],
      properties: {
        backgroundColor: "#ffffff",
      },
    },
    {
      id: "footer",
      name: "Footer",
      elements: [
        {
          id: "footer-text",
          type: "paragraph",
          content: "© 2025 Your Company. All rights reserved.",
          properties: {
            align: "center",
            color: "#999999",
            fontSize: "14px",
          },
        },
      ],
      properties: {
        backgroundColor: "#f5f5f5",
      },
    },
  ],
}

