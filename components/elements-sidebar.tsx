"use client"

import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Heading, Type, Image, BoxIcon as ButtonIcon, Box, List, FormInput } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ElementsSidebar() {
  const elementCategories = [
    {
      id: "basic",
      name: "Basic Elements",
      elements: [
        { id: "heading", name: "Heading", icon: <Heading className="h-4 w-4 mr-2" /> },
        { id: "paragraph", name: "Paragraph", icon: <Type className="h-4 w-4 mr-2" /> },
        { id: "image", name: "Image", icon: <Image className="h-4 w-4 mr-2" /> },
        { id: "button", name: "Button", icon: <ButtonIcon className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      id: "layout",
      name: "Layout",
      elements: [
        { id: "container", name: "Container", icon: <Box className="h-4 w-4 mr-2" /> },
        { id: "columns", name: "Columns", icon: <List className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      id: "forms",
      name: "Forms",
      elements: [
        { id: "form", name: "Form", icon: <FormInput className="h-4 w-4 mr-2" /> },
        { id: "input", name: "Input", icon: <Type className="h-4 w-4 mr-2" /> },
      ],
    },
  ]

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <p className="text-sm text-muted-foreground mb-4">Drag and drop elements onto the canvas</p>

      <Accordion type="multiple" defaultValue={["basic"]}>
        {elementCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-sm font-medium">{category.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {category.elements.map((element, index) => (
                  <Droppable
                    key={`${category.id}-${element.id}`}
                    droppableId={`${category.id}-${element.id}`}
                    isDropDisabled={true}
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Draggable draggableId={`${category.id}-${element.id}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center p-2 rounded-md text-sm border bg-background ${
                                snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                            >
                              {element.icon}
                              {element.name}
                            </div>
                          )}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

