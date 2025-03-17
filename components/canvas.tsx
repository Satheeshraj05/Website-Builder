"use client"

import { Droppable } from "@hello-pangea/dnd"
import type { Element, Section, Template } from "@/lib/types"
import CanvasElement from "./canvas-element"

interface CanvasProps {
  template: Template
  onElementSelect: (element: Element) => void
  isPreview?: boolean
}

export default function Canvas({ template, onElementSelect, isPreview = false }: CanvasProps) {
  return (
    <div className="min-h-[500px]">
      {template.sections.map((section) => (
        <CanvasSection key={section.id} section={section} onElementSelect={onElementSelect} isPreview={isPreview} />
      ))}
    </div>
  )
}

interface CanvasSectionProps {
  section: Section
  onElementSelect: (element: Element) => void
  isPreview?: boolean
}

function CanvasSection({ section, onElementSelect, isPreview = false }: CanvasSectionProps) {
  return (
    <div
      className={`p-4 ${section.properties?.backgroundColor ? "" : "bg-white"}`}
      style={{
        backgroundColor: section.properties?.backgroundColor,
      }}
    >
      {!isPreview && section.name && (
        <div className="text-xs text-muted-foreground mb-2 border-b pb-1">{section.name}</div>
      )}

      {isPreview ? (
        <div className="min-h-[50px]">
          {section.elements.map((element, index) => (
            <CanvasElement
              key={element.id}
              element={element}
              index={index}
              onSelect={() => onElementSelect(element)}
              isPreview={true}
            />
          ))}
          {section.elements.length === 0 && (
            <div className="h-24 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground text-sm">
              No content in this section
            </div>
          )}
        </div>
      ) : (
        <Droppable droppableId={section.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[100px] transition-colors ${snapshot.isDraggingOver ? "bg-primary/10" : ""}`}
            >
              {section.elements.map((element, index) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  index={index}
                  onSelect={() => onElementSelect(element)}
                />
              ))}
              {provided.placeholder}
              {section.elements.length === 0 && !snapshot.isDraggingOver && (
                <div className="h-24 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground text-sm">
                  Drag and drop elements here
                </div>
              )}
            </div>
          )}
        </Droppable>
      )}
    </div>
  )
}

