"use client"

import { useState, useEffect } from "react"
import type { Element } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface PropertyEditorProps {
  selectedElement: Element | null
  onElementUpdate: (element: Element) => void
}

export default function PropertyEditor({ selectedElement, onElementUpdate }: PropertyEditorProps) {
  const [editedElement, setEditedElement] = useState<Element | null>(null)

  useEffect(() => {
    setEditedElement(selectedElement)
  }, [selectedElement])

  if (!editedElement) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-sm text-muted-foreground">Select an element to edit its properties</p>
      </div>
    )
  }

  const handleContentChange = (content: string) => {
    setEditedElement({
      ...editedElement,
      content,
    })
  }

  const handlePropertyChange = (key: string, value: any) => {
    setEditedElement({
      ...editedElement,
      properties: {
        ...editedElement.properties,
        [key]: value,
      },
    })
  }

  const handleSave = () => {
    if (editedElement) {
      onElementUpdate(editedElement)
    }
  }

  const renderContentEditor = () => {
    switch (editedElement.type) {
      case "heading":
      case "button":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Text</Label>
              <Input id="content" value={editedElement.content} onChange={(e) => handleContentChange(e.target.value)} />
            </div>
          </div>
        )

      case "paragraph":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Text</Label>
              <Textarea
                id="content"
                rows={5}
                value={editedElement.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={editedElement.properties?.src || ""}
                onChange={(e) => handlePropertyChange("src", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL or use the placeholder: /placeholder.svg?height=200&width=400
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={editedElement.properties?.alt || ""}
                onChange={(e) => handlePropertyChange("alt", e.target.value)}
              />
            </div>
          </div>
        )

      case "container":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="containerContent">Container Description</Label>
              <Textarea
                id="containerContent"
                rows={3}
                value={editedElement.content || ""}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Add a description for this container (optional)"
              />
              <p className="text-xs text-muted-foreground">
                This description is for your reference only and won't be displayed on the page.
              </p>
            </div>
          </div>
        )

      case "columns":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="columnsContent">Columns Description</Label>
              <Textarea
                id="columnsContent"
                rows={3}
                value={editedElement.content || ""}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Add a description for this columns layout (optional)"
              />
              <p className="text-xs text-muted-foreground">
                This description is for your reference only and won't be displayed on the page.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderStyleEditor = () => {
    switch (editedElement.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">Heading Level</Label>
              <Select
                value={editedElement.properties?.level || "h2"}
                onValueChange={(value) => handlePropertyChange("level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="h5">H5</SelectItem>
                  <SelectItem value="h6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "left" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "center" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "right" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Text Color</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  id="color"
                  value={editedElement.properties?.color || "#000000"}
                  onChange={(e) => handlePropertyChange("color", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={editedElement.properties?.color || "#000000"}
                  onChange={(e) => handlePropertyChange("color", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                value={editedElement.properties?.fontSize || "24px"}
                onChange={(e) => handlePropertyChange("fontSize", e.target.value)}
              />
            </div>
          </div>
        )

      case "paragraph":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "left" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "center" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "right" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "justify" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "justify")}
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Text Color</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  id="color"
                  value={editedElement.properties?.color || "#333333"}
                  onChange={(e) => handlePropertyChange("color", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={editedElement.properties?.color || "#333333"}
                  onChange={(e) => handlePropertyChange("color", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                value={editedElement.properties?.fontSize || "16px"}
                onChange={(e) => handlePropertyChange("fontSize", e.target.value)}
              />
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={editedElement.properties?.width || "100%"}
                onChange={(e) => handlePropertyChange("width", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={editedElement.properties?.height || "auto"}
                onChange={(e) => handlePropertyChange("height", e.target.value)}
              />
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="variant">Button Style</Label>
              <Select
                value={editedElement.properties?.variant || "default"}
                onValueChange={(value) => handlePropertyChange("variant", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Button Size</Label>
              <Select
                value={editedElement.properties?.size || "default"}
                onValueChange={(value) => handlePropertyChange("size", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Button Alignment</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "left" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "center" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editedElement.properties?.align === "right" ? "default" : "outline"}
                  onClick={() => handlePropertyChange("align", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Button Link</Label>
              <Input
                id="link"
                value={editedElement.properties?.link || "#"}
                onChange={(e) => handlePropertyChange("link", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="padding">Button Padding</Label>
              <Input
                id="padding"
                value={editedElement.properties?.padding || "0.5rem 1rem"}
                onChange={(e) => handlePropertyChange("padding", e.target.value)}
                placeholder="e.g., 0.5rem 1rem"
              />
              <p className="text-xs text-muted-foreground">
                Format: top/bottom right/left (e.g., "0.5rem 1rem") or all sides (e.g., "0.5rem")
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="margin">Button Margin</Label>
              <Input
                id="margin"
                value={editedElement.properties?.margin || "0"}
                onChange={(e) => handlePropertyChange("margin", e.target.value)}
                placeholder="e.g., 0 0 0 1rem"
              />
              <p className="text-xs text-muted-foreground">
                For indentation, use "0 0 0 1rem" (left indent) or "0 1rem 0 0" (right indent)
              </p>
            </div>
          </div>
        )

      case "container":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={editedElement.properties?.padding || "16px"}
                onChange={(e) => handlePropertyChange("padding", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  id="backgroundColor"
                  value={editedElement.properties?.backgroundColor || "#f9f9f9"}
                  onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={editedElement.properties?.backgroundColor || "#f9f9f9"}
                  onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                value={editedElement.properties?.borderRadius || "4px"}
                onChange={(e) => handlePropertyChange("borderRadius", e.target.value)}
              />
            </div>
          </div>
        )

      case "columns":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="columns">Number of Columns</Label>
              <Select
                value={String(editedElement.properties?.columns || 2)}
                onValueChange={(value) => handlePropertyChange("columns", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select columns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gap">Gap Between Columns</Label>
              <Input
                id="gap"
                value={editedElement.properties?.gap || "16px"}
                onChange={(e) => handlePropertyChange("gap", e.target.value)}
              />
            </div>
          </div>
        )

      case "form":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="action">Form Action</Label>
              <Input
                id="action"
                value={editedElement.properties?.action || "#"}
                onChange={(e) => handlePropertyChange("action", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Form Method</Label>
              <Select
                value={editedElement.properties?.method || "post"}
                onValueChange={(value) => handlePropertyChange("method", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="get">GET</SelectItem>
                  <SelectItem value="post">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "input":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Input Label</Label>
              <Input
                id="label"
                value={editedElement.properties?.label || "Input Field"}
                onChange={(e) => handlePropertyChange("label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={editedElement.properties?.placeholder || "Enter text here"}
                onChange={(e) => handlePropertyChange("placeholder", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Input Type</Label>
              <Select
                value={editedElement.properties?.type || "text"}
                onValueChange={(value) => handlePropertyChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="tel">Telephone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={editedElement.properties?.required || false}
                onCheckedChange={(checked) => handlePropertyChange("required", checked === true)}
              />
              <Label htmlFor="required">Required field</Label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <div className="text-xs px-2 py-1 bg-muted rounded-md">{editedElement.type}</div>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4 pt-4">
          {renderContentEditor()}
        </TabsContent>
        <TabsContent value="style" className="space-y-4 pt-4">
          {renderStyleEditor()}
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={handleSave} className="w-full">
          Apply Changes
        </Button>
      </div>
    </div>
  )
}

