"use client"

import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import type { Element } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { JSX } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CanvasElementProps {
  element: Element
  index: number
  onSelect: () => void
  isPreview?: boolean
}

export default function CanvasElement({ element, index, onSelect, isPreview = false }: CanvasElementProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const renderElementContent = () => {
    switch (element.type) {
      case "heading":
        const HeadingTag = (element.properties?.level || "h2") as keyof JSX.IntrinsicElements
        return (
          <HeadingTag
            style={{
              color: element.properties?.color,
              fontSize: element.properties?.fontSize,
              textAlign: element.properties?.align as any,
            }}
          >
            {element.content}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p
            style={{
              color: element.properties?.color,
              fontSize: element.properties?.fontSize,
              textAlign: element.properties?.align as any,
            }}
          >
            {element.content}
          </p>
        )

      case "image":
        const imgSrc = element.properties?.src || "/placeholder.svg?height=200&width=400"

        // Handle external images with a fallback
        return (
          <div className="relative">
            {imageError ? (
              // Fallback for image errors
              <div
                className="flex items-center justify-center bg-muted border rounded-md"
                style={{
                  width: element.properties?.width || "100%",
                  height: "200px",
                }}
              >
                <p className="text-muted-foreground text-sm">Image could not be loaded</p>
              </div>
            ) : (
              // Try to use regular img tag for external images
              <img
                src={imgSrc || "/placeholder.svg"}
                alt={element.properties?.alt || ""}
                style={{
                  width: element.properties?.width || "100%",
                  height: element.properties?.height || "auto",
                  maxWidth: "100%",
                }}
                onError={() => setImageError(true)}
                className="max-w-full h-auto rounded-md"
              />
            )}
          </div>
        )

      case "button":
        // Create a wrapper div for alignment
        const buttonAlign = element.properties?.align || "left"
        const alignmentClass =
          buttonAlign === "center"
            ? "flex justify-center"
            : buttonAlign === "right"
              ? "flex justify-end"
              : "flex justify-start"

        return (
          <div className={alignmentClass}>
            <Button
              variant={(element.properties?.variant as any) || "default"}
              size={(element.properties?.size as any) || "default"}
              asChild
              style={{
                padding: element.properties?.padding,
                margin: element.properties?.margin,
              }}
            >
              <a href={element.properties?.link || "#"}>{element.content}</a>
            </Button>
          </div>
        )

      case "container":
        return (
          <div
            style={{
              padding: element.properties?.padding,
              backgroundColor: element.properties?.backgroundColor,
              borderRadius: element.properties?.borderRadius,
            }}
            className="border min-h-[50px] flex flex-col items-center justify-center text-muted-foreground"
          >
            {!isPreview && element.content ? (
              <div className="text-xs italic mb-2 px-2 text-center">{element.content}</div>
            ) : null}
            <div>Container Element (would contain nested elements)</div>
          </div>
        )

      case "columns":
        const columns = element.properties?.columns || 2
        return (
          <div className="flex flex-col">
            {!isPreview && element.content ? (
              <div className="text-xs italic mb-2 px-2 text-center text-muted-foreground">{element.content}</div>
            ) : null}
            <div
              className={`grid gap-4 min-h-[50px]`}
              style={{
                gap: element.properties?.gap,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
            >
              {Array.from({ length: columns }).map((_, i) => (
                <div
                  key={i}
                  className="border border-dashed p-4 flex items-center justify-center text-muted-foreground"
                >
                  Column {i + 1}
                </div>
              ))}
            </div>
          </div>
        )

      case "form":
        return (
          <div className="border p-4 rounded-md">
            <div className="text-sm font-medium mb-2">Form Element</div>
            <div className="flex flex-col gap-2">
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Button size="sm">Submit</Button>
            </div>
          </div>
        )

      case "input":
        return (
          <div className="space-y-2">
            <Label>{element.properties?.label || "Input Field"}</Label>
            <Input
              type={element.properties?.type || "text"}
              placeholder={element.properties?.placeholder || "Enter text here"}
              required={element.properties?.required}
            />
          </div>
        )

      default:
        return <div>{element.content}</div>
    }
  }

  if (isPreview) {
    return <div className="my-2">{renderElementContent()}</div>
  }

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "relative my-2 p-2 rounded-md cursor-move transition-all",
            snapshot.isDragging ? "shadow-lg" : "",
            isHovered || snapshot.isDragging ? "ring-2 ring-primary" : "",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
        >
          {renderElementContent()}

          {/* Element type indicator */}
          {(isHovered || snapshot.isDragging) && (
            <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-1 rounded-br">
              {element.type}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

