"use client"

import { useState, useEffect } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Save, Undo, Redo, Eye, Code, Laptop, Tablet, Smartphone } from "lucide-react"
import ElementsSidebar from "./elements-sidebar"
import Canvas from "./canvas"
import PropertyEditor from "./property-editor"
import type { Element, Template } from "@/lib/types"
import { defaultTemplate } from "@/lib/default-template"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Label } from "@/components/ui/label"

export default function WebsiteBuilder() {
  const [template, setTemplate] = useState<Template>(defaultTemplate)
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [history, setHistory] = useState<Template[]>([defaultTemplate])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState<Template[]>([])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [templateName, setTemplateName] = useState(template.name)

  // Load saved templates from localStorage on component mount
  useEffect(() => {
    try {
      const savedTemplatesJSON = localStorage.getItem("savedTemplates")
      if (savedTemplatesJSON) {
        const templates = JSON.parse(savedTemplatesJSON)
        setSavedTemplates(templates)
      }
    } catch (error) {
      console.error("Error loading saved templates:", error)
    }
  }, [])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Creating a new element from the sidebar
    if (source.droppableId.includes("-")) {
      // Extract the element type from the droppableId (e.g., "basic-heading" -> "heading")
      const elementType = source.droppableId.split("-")[1]

      const newElement: Element = createNewElement(elementType, destination.index)

      const newTemplate = { ...template }
      const sectionId = destination.droppableId

      // Find the section and add the element
      const section = newTemplate.sections.find((s) => s.id === sectionId)
      if (section) {
        section.elements.splice(destination.index, 0, newElement)

        // Save to history
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newTemplate)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)

        setTemplate(newTemplate)
      }
    }
    // Moving an existing element
    else if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      const newTemplate = { ...template }

      // Find source and destination sections
      const sourceSection = newTemplate.sections.find((s) => s.id === source.droppableId)
      const destSection = newTemplate.sections.find((s) => s.id === destination.droppableId)

      if (sourceSection && destSection) {
        // Remove from source
        const [movedElement] = sourceSection.elements.splice(source.index, 1)

        // Add to destination
        destSection.elements.splice(destination.index, 0, movedElement)

        // Save to history
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newTemplate)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)

        setTemplate(newTemplate)
      }
    }
  }

  const createNewElement = (elementType: string, index: number): Element => {
    const id = `element-${Date.now()}`

    // Create different elements based on type
    switch (elementType) {
      case "heading":
        return {
          id,
          type: "heading",
          content: "New Heading",
          properties: {
            level: "h2",
            align: "left",
            color: "#000000",
            fontSize: "24px",
          },
        }

      case "paragraph":
        return {
          id,
          type: "paragraph",
          content: "This is a new paragraph. Click to edit the content.",
          properties: {
            align: "left",
            color: "#333333",
            fontSize: "16px",
          },
        }

      case "image":
        return {
          id,
          type: "image",
          content: "",
          properties: {
            src: "/placeholder.svg?height=200&width=400",
            alt: "Image description",
            width: "100%",
            height: "auto",
          },
        }

      case "button":
        return {
          id,
          type: "button",
          content: "Click Me",
          properties: {
            variant: "default",
            size: "default",
            link: "#",
            align: "left",
          },
        }

      case "container":
        return {
          id,
          type: "container",
          content: "",
          properties: {
            padding: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
          },
        }

      case "columns":
        return {
          id,
          type: "columns",
          content: "",
          properties: {
            columns: 2,
            gap: "16px",
          },
        }

      case "form":
        return {
          id,
          type: "form",
          content: "",
          properties: {
            action: "#",
            method: "post",
          },
        }

      case "input":
        return {
          id,
          type: "input",
          content: "",
          properties: {
            label: "Input Field",
            placeholder: "Enter text here",
            type: "text",
            required: false,
          },
        }

      default:
        // Default fallback
        return {
          id,
          type: "paragraph",
          content: "New element",
          properties: {},
        }
    }
  }

  const handleElementSelect = (element: Element) => {
    setSelectedElement(element)
  }

  const handleElementUpdate = (updatedElement: Element) => {
    const newTemplate = { ...template }

    // Find and update the element
    for (const section of newTemplate.sections) {
      const elementIndex = section.elements.findIndex((e) => e.id === updatedElement.id)
      if (elementIndex !== -1) {
        section.elements[elementIndex] = updatedElement

        // Save to history
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newTemplate)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)

        setTemplate(newTemplate)
        setSelectedElement(updatedElement)
        break
      }
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setTemplate(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setTemplate(history[historyIndex + 1])
    }
  }

  const handlePreview = () => {
    setPreviewOpen(true)
  }

  const handleExport = () => {
    setExportOpen(true)
  }

  const handleSave = () => {
    setSaveDialogOpen(true)
    setTemplateName(template.name)
  }

  const saveTemplate = () => {
    // Create a copy of the template with the new name
    const templateToSave = {
      ...template,
      name: templateName,
      id: `template-${Date.now()}`,
    }

    // Save to local storage
    try {
      // Get existing templates from localStorage
      const existingTemplatesJSON = localStorage.getItem("savedTemplates")
      let existingTemplates: Template[] = existingTemplatesJSON ? JSON.parse(existingTemplatesJSON) : []

      // Add the new template
      existingTemplates = [...existingTemplates, templateToSave]

      // Save back to localStorage
      localStorage.setItem("savedTemplates", JSON.stringify(existingTemplates))

      // Update state
      setSavedTemplates(existingTemplates)

      // Close dialog and show success message
      setSaveDialogOpen(false)
      toast({
        title: "Template saved",
        description: `"${templateName}" has been saved successfully.`,
      })
    } catch (error) {
      console.error("Error saving template:", error)
      toast({
        title: "Error saving template",
        description: "There was a problem saving your template. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Generate HTML for export
  const generateHTML = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 0; }
    .section { padding: 1rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .button-container { display: flex; }
    .justify-start { justify-content: flex-start; }
    .justify-center { justify-content: center; }
    .justify-end { justify-content: flex-end; }
  </style>
</head>
<body>`

    // Add each section and its elements
    template.sections.forEach((section) => {
      html += `\n  <div class="section" style="background-color: ${section.properties?.backgroundColor || "#ffffff"}">
    <div class="container">`

      // Add each element in the section
      section.elements.forEach((element) => {
        switch (element.type) {
          case "heading":
            const level = element.properties?.level || "h2"
            html += `\n      <${level} style="color: ${element.properties?.color || "#000000"}; font-size: ${element.properties?.fontSize || "24px"}; text-align: ${element.properties?.align || "left"}">${element.content}</${level}>`
            break

          case "paragraph":
            html += `\n      <p style="color: ${element.properties?.color || "#333333"}; font-size: ${element.properties?.fontSize || "16px"}; text-align: ${element.properties?.align || "left"}">${element.content}</p>`
            break

          case "image":
            html += `\n      <img src="${element.properties?.src || ""}" alt="${element.properties?.alt || ""}" style="width: ${element.properties?.width || "100%"}; height: ${element.properties?.height || "auto"}">`
            break

          case "button":
            const buttonAlign = element.properties?.align || "left"
            const alignClass =
              buttonAlign === "center" ? "justify-center" : buttonAlign === "right" ? "justify-end" : "justify-start"

            html += `\n      <div class="button-container ${alignClass}">
        <a href="${element.properties?.link || "#"}" style="display: inline-block; padding: ${element.properties?.padding || "0.5rem 1rem"}; margin: ${element.properties?.margin || "0"}; background-color: #0070f3; color: white; text-decoration: none; border-radius: 0.25rem;">${element.content}</a>
      </div>`
            break

          // Add other element types as needed
        }
      })

      html += `\n    </div>
  </div>`
    })

    html += `\n</body>
</html>`

    return html
  }

  // Generate CSS for export
  const generateCSS = () => {
    return `/* Styles for ${template.name} */
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.section {
  padding: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.button-container {
  display: flex;
}

.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
`
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <div className="border-b bg-background p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Website Builder</h1>
          <div className="border-l h-6 mx-2" />
          <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex === 0}>
            <Undo className="h-4 w-4 mr-1" />
            Undo
          </Button>
          <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex === history.length - 1}>
            <Redo className="h-4 w-4 mr-1" />
            Redo
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="border rounded-md p-1 flex">
            <Button
              variant={viewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("desktop")}
            >
              <Laptop className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Code className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Elements Sidebar */}
          <div className="w-64 border-r bg-muted/40 overflow-y-auto">
            <ElementsSidebar />
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto bg-accent/10 p-4">
            <div
              className={`mx-auto bg-background shadow-sm border rounded-md transition-all duration-300 ${
                viewMode === "desktop" ? "max-w-6xl" : viewMode === "tablet" ? "max-w-md" : "max-w-sm"
              }`}
            >
              <Canvas template={template} onElementSelect={handleElementSelect} />
            </div>
          </div>

          {/* Property Editor */}
          <div className="w-80 border-l bg-muted/40 overflow-y-auto">
            <PropertyEditor selectedElement={selectedElement} onElementUpdate={handleElementUpdate} />
          </div>
        </DragDropContext>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Preview: {template.name}</span>
              <div className="border rounded-md p-1 flex">
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  className="px-2"
                  onClick={() => setViewMode("desktop")}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  className="px-2"
                  onClick={() => setViewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  className="px-2"
                  onClick={() => setViewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>This is how your website will look to visitors.</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto bg-accent/10 p-4">
            <div
              className={`mx-auto bg-background shadow-sm border rounded-md transition-all duration-300 ${
                viewMode === "desktop" ? "max-w-6xl" : viewMode === "tablet" ? "max-w-md" : "max-w-sm"
              }`}
            >
              <div className="preview-mode">
                <Canvas template={template} onElementSelect={() => {}} isPreview={true} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Export Website</DialogTitle>
            <DialogDescription>Copy the HTML and CSS code to use in your own project.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="html" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="flex-1 overflow-hidden flex flex-col">
              <div className="bg-muted rounded-md p-2 flex-1 overflow-auto">
                <pre className="text-sm">{generateHTML()}</pre>
              </div>
              <Button
                className="mt-4"
                onClick={() => {
                  navigator.clipboard.writeText(generateHTML())
                  toast({
                    title: "HTML copied",
                    description: "HTML code has been copied to clipboard.",
                  })
                }}
              >
                Copy HTML
              </Button>
            </TabsContent>
            <TabsContent value="css" className="flex-1 overflow-hidden flex flex-col">
              <div className="bg-muted rounded-md p-2 flex-1 overflow-auto">
                <pre className="text-sm">{generateCSS()}</pre>
              </div>
              <Button
                className="mt-4"
                onClick={() => {
                  navigator.clipboard.writeText(generateCSS())
                  toast({
                    title: "CSS copied",
                    description: "CSS code has been copied to clipboard.",
                  })
                }}
              >
                Copy CSS
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>Enter a name for your template to save it.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <input
                id="template-name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTemplate} disabled={!templateName.trim()}>
              Save Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

