### Website Builder - Drag and Drop Page Builder

A modern, intuitive drag-and-drop website builder that allows you to create responsive websites without writing code. Design your website visually by dragging elements onto the canvas, customizing their properties, and exporting the generated HTML and CSS.





## Features

- **Intuitive Drag and Drop Interface**: Easily build pages by dragging elements from the sidebar onto the canvas
- **Rich Element Library**: Create content with various elements:

- Basic elements: Headings, paragraphs, images, buttons
- Layout elements: Containers, multi-column layouts
- Form elements: Form containers, input fields



- **Detailed Property Editor**: Customize every aspect of your elements:

- Text formatting (font size, color, alignment)
- Spacing controls (padding, margin)
- Visual styling (background colors, border radius)
- Element-specific properties



- **Responsive Design Preview**: Test your design across different device sizes:

- Desktop view
- Tablet view
- Mobile view



- **Full History Management**: Never lose your work with:

- Undo/redo functionality
- Template saving to local storage



- **Export Options**: Use your design anywhere with:

- HTML export
- CSS export



- **Real-time Preview**: See exactly how your website will look to visitors
- **Alignment Controls**: Precisely position elements with alignment options for text and buttons


## Installation

### Prerequisites

- Node.js (v18.18.0 or higher)
- npm or yarn


### Setup Instructions

1. Clone the repository:

```shellscript
git clone https://github.com/Satheeshraj05/Website-Builder.git
cd website-builder
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open your browser and navigate to:

```plaintext
http://localhost:3000
```




## Usage Guide

### Building Your First Page

1. **Start with a Template**: When you first open the builder, you'll see a default template with header, content, and footer sections.
2. **Add Elements**: Drag elements from the left sidebar onto the canvas. Elements are organized into categories:

1. Basic Elements: Headings, paragraphs, images, buttons
2. Layout: Containers, columns
3. Forms: Form containers, input fields



3. **Edit Properties**: Click on any element to select it and edit its properties in the right sidebar:

1. **Content Tab**: Edit the text content, URLs, or element-specific content
2. **Style Tab**: Customize appearance with options for colors, sizes, alignment, and more



4. **Preview Your Design**: Click the "Preview" button in the top toolbar to see how your website will look to visitors.
5. **Test Responsiveness**: Use the device toggle buttons (desktop, tablet, mobile) to check how your design adapts to different screen sizes.
6. **Save Your Work**: Click the "Save" button to store your template in the browser's local storage.
7. **Export Your Website**: Click the "Export" button to generate HTML and CSS code that you can use in any web project.


### Working with Elements

#### Text Elements

- **Headings**: Choose from H1-H6 levels, adjust alignment, color, and font size
- **Paragraphs**: Format text with alignment, color, and font size options


#### Media Elements

- **Images**: Set image source URL, alt text, dimensions, and sizing options


#### Interactive Elements

- **Buttons**: Customize style, size, link URL, alignment, padding, and margins


#### Layout Elements

- **Containers**: Create styled boxes with custom padding, background color, and border radius
- **Columns**: Create multi-column layouts with customizable column count and gap spacing


#### Form Elements

- **Forms**: Set form action and method
- **Inputs**: Configure label text, placeholder, input type, and required status


## Project Structure

```plaintext
website-builder/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main page component
├── components/           # React components
│   ├── canvas.tsx        # Canvas rendering component
│   ├── canvas-element.tsx # Individual element renderer
│   ├── elements-sidebar.tsx # Element selection sidebar
│   ├── property-editor.tsx # Property editing panel
│   ├── website-builder.tsx # Main builder component
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and types
│   ├── default-template.ts # Default template definition
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag and Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) (Fork of react-beautiful-dnd)
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: For type safety and better developer experience


## Key Dependencies

```json
{
  "dependencies": {
    "@hello-pangea/dnd": "^16.0.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

## Browser Compatibility

The Website Builder works best in modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


Please make sure to update tests as appropriate and follow the code style of the project.

## Future Enhancements

- Nested elements support
- More element types (video, social media embeds, maps)
- Custom CSS editor
- Template library
- Cloud storage for templates
- Team collaboration features
- Publishing to hosting platforms


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [hello-pangea/dnd](https://github.com/hello-pangea/dnd) for the drag and drop functionality
- [Lucide](https://lucide.dev/) for the icon set


---

Created by Satheesh Raj
