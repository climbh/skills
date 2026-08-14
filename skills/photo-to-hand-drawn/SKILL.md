---
name: photo-to-hand-drawn
description: Transform a user-provided photograph in one of two ways: convert all depicted content into a hand-drawn watercolor, or selectively retain specified parts of the original photograph while turning the rest into watercolor with organic transitions. Use whenever the user asks to turn a photo into watercolor, a drawing, illustration, sketch, or hand-painted image, or requests 原图加水彩、局部保留原图、照片与水彩融合、部分原图部分水彩、上下连贯水彩, or a similar mixed photo-and-painting treatment.
---

# Photo to Hand-Drawn

Turn one source photograph into either a complete watercolor interpretation or a selective photo-and-watercolor hybrid.

The default visual language is a **watercolor vignette**: paint the important subject and let peripheral marks become lighter, broken, and incomplete until they dissolve into untouched paper. This creates organic negative space without making the artwork look like a rectangular photo, a framed print, or a torn paper object.

## Output modes

Choose exactly one mode before generating.

### Mode 1 — Full watercolor conversion

Use when the user asks to convert a photo into watercolor, hand drawing, illustration, or a sketch without asking to retain any photographic area.

Convert all depicted content chosen for the final composition into watercolor. No part of the source should remain visibly photographic.

Output one watercolor painting:

- preserve the source orientation and overall aspect ratio
- paint the defining subject and enough context to retain the visual story
- keep generous blank warm-white or ivory paper around the painted area
- allow the painted area to occupy roughly `65%–85%` of the canvas, depending on the subject
- let the outer paint boundary remain asymmetrical and naturally unfinished
- do not fill the canvas edge to edge

The painting may remain a subject-focused vignette with naturally unfinished edges and blank paper, following the established visual style. “Full watercolor” means that every visible scene element is rendered as paint—not that pigment must fill every edge of the canvas.

This is the default mode.

### Mode 2 — Selective original-to-watercolor transition

Use when the user requests:

- parts of the original photo should remain visible
- the remaining content should become watercolor
- photo and painting should coexist in one continuous image
- a directional transition such as top-to-bottom, side-to-side, or center-to-edge
- `上下排版`
- `上面原图，下面水彩`
- `原图加手绘`
- `照片逐渐变成水彩`
- `保留原图的某些内容`
- `局部原图，局部水彩`
- a similar mixed photo-and-watercolor treatment

Output one continuous image that shows the scene only once:

1. retained region — preserve the requested source content as genuine photographic pixels
2. transition region — let photographic detail progressively break into translucent pigment, blooms, broken lines, and paper
3. painted region — render all remaining corresponding content as watercolor

Preserve the source composition, viewpoint, spatial alignment, and overall aspect ratio. Every landmark must stay in its original position through the transition. The result is one scene changing medium—not two complete versions stacked together.

If the user specifies what to retain, follow that selection precisely. They may identify a subject, sky, building, face, object, foreground, background, upper area, or any other region. If they request this mode without naming a retained area, choose a visually coherent region that supports the focal story—usually the main subject or the most distinctive photographic atmosphere—and keep the retained area restrained enough that the watercolor treatment remains clear.

The transition may follow subject contours, depth layers, light, clouds, terrain, architecture, or a requested direction. Do not force an upper/lower layout. Avoid a straight mask edge or a uniform digital gradient. Allow watercolor marks to intrude irregularly into retained photography and a few photographic details to continue into the painted area before dissolving.

Do not add a gap, divider, white band, repeated composition, labels, or separate panels. When tools permit, preserve the selected source pixels and use masked image editing or careful compositing rather than asking the model to reconstruct the retained photograph.

If the user does not specify a mode, use Mode 1.

## Workflow

### 1. Inspect the source

Identify:

- the primary subject or focal structure
- the overall composition and viewpoint
- defining silhouettes and contours
- important depth layers and spatial relationships
- dominant and accent colors
- lighting direction, contrast, and atmosphere
- details necessary for identity
- peripheral detail that can disappear into white space

Understand the scene as one composition rather than a collection of isolated objects.

### 2. Select the painted subject

Paint only what is needed to preserve the image's identity and emotional character.

For landscapes, prioritize:

- the defining ridge, shoreline, tree, building, or landform
- major light and shadow masses
- one or two atmospheric context layers
- small scale cues such as a person or boat when they matter

For portraits, prioritize:

- face, hairstyle, expression, pose, hands, and defining clothing
- the relationship between multiple people
- only enough background to support the portrait

For architecture and objects, prioritize:

- recognizable silhouette and proportions
- perspective and major structural divisions
- characteristic materials, colors, and distinctive details

Peripheral content may be simplified, partially painted, or omitted when the subject remains recognizable.

### 3. Choose the medium

Follow the user's requested medium. Supported treatments include:

- transparent watercolor
- watercolor with delicate pencil or ink
- gouache
- ink wash
- pencil sketch
- colored pencil
- pastel
- restrained editorial illustration

When the user says only “hand-drawn” or “simple watercolor,” use transparent watercolor with sparse pencil or fine-ink accents.

### 4. Preserve source identity

Preserve:

- the subject's defining silhouette and proportions
- faces, expressions, poses, skin tones, hairstyles, and clothing when people are present
- architecture and perspective
- major landforms, shorelines, branches, windows, vehicles, or other identifying shapes
- the relative placement and scale of important elements
- characteristic color relationships and lighting mood

Do not invent prominent objects or remove details that establish identity.

### 5. Create natural watercolor edges

Use watercolor technique—not a graphic mask—to transition from painted subject to blank paper.

Let the paint end through a varied combination of:

- translucent washes fading in value
- wet-on-wet lost edges
- broken pencil or ink contours
- dry-brush marks
- scattered pigment blooms
- incomplete peripheral shapes
- untouched paper interrupting the painted boundary

The outer boundary should be irregular, open, and different on every side. Some subject contours may remain crisp, while atmospheric areas can dissolve almost completely.

Do not surround the scene with a continuous rectangular boundary.

## What this style is not

Do not confuse the watercolor vignette with:

- a torn or deckled paper cutout
- a separate paper object placed on a background
- a framed or matted print
- a rectangular photo with a watercolor filter
- a full-bleed painting
- a sticker, collage piece, or clipping

Unless explicitly requested, do not add:

- drop shadows
- visible paper edges or paper thickness
- frames, borders, mats, tape, pins, or clips
- captions, metadata, color swatches, signatures, or logos
- decorative objects unrelated to the source

## Detail and style strength

Use progressively less detail away from the focal subject.

- `light` or `subtle` — high source fidelity, delicate linework, pale washes, more blank paper
- `balanced` — recognizable subject, moderate simplification, clear watercolor character
- `strong` or `expressive` — bolder marks and more omission, while retaining defining structure

For “simple watercolor,” favor fewer shapes, lighter washes, restrained saturation, and more negative space.

## Portrait handling

When people are prominent:

- preserve identity rather than replacing the person with a generic illustrated character
- preserve expression, pose, age cues, skin tone, hairstyle, clothing, and relationships
- keep hands anatomically plausible
- avoid beautification or body changes unless requested
- let secondary clothing or background marks fade before facial identity does

## Mode 1 prompt template

```text
Transform the source photograph into a subject-focused watercolor vignette on warm-white watercolor paper.

Convert every visible scene element into watercolor. Do not retain photographic pixels or leave any region looking like an unedited photograph.

Preserve the defining subject, composition, viewpoint, proportions, identity, characteristic colors, and lighting mood. Paint only the subject and the contextual elements needed to retain the source's visual story. Simplify or omit peripheral detail.

Use transparent watercolor with restrained hand-drawn structure. Keep the focal area readable, then progressively reduce detail and pigment toward the outside. Let the painted area end organically through translucent fading washes, wet-on-wet lost edges, broken contours, dry-brush marks, scattered blooms, incomplete shapes, and untouched white paper.

Leave generous irregular white space around the painted subject. Do not fill the canvas. Do not create a rectangular image boundary.

This is a watercolor vignette, not torn paper. Do not add a separate paper cutout, deckled edge, paper thickness, drop shadow, frame, mat, border, tape, collage, caption, signature, logo, or watermark.
```

## Mode 2 workflow and prompt

1. Keep the source canvas dimensions and aspect ratio; do not duplicate the scene or make a multi-panel canvas.
2. Identify the exact content to remain photographic from the user's request. If unspecified, choose one coherent focal or atmospheric region.
3. Preserve that content from the actual source without stretching, repainting, or relocating it.
4. Transform all other scene content into aligned watercolor.
5. Build a broad, irregular transition that responds to real contours and depth rather than looking like a geometric mask.
6. Let the outer painted edges fade selectively into warm-white paper when appropriate.
7. Export one continuous composition with no gap, divider, labels, or repeated image.

Use:

```text
Create one continuous selective photo-to-watercolor transformation from the source image. Show the scene only once and preserve its original aspect ratio, viewpoint, geometry, identity, and landmark positions.

Keep [DESCRIBE CONTENT TO RETAIN] as the genuine original photograph. Transform all other corresponding content into a simple hand-painted watercolor. Preserve exact spatial alignment between retained photography and painted forms.

Build an organic transition around the retained content with translucent washes, wet-on-wet blooms, granulated pigment, broken pencil or ink contours, dry-brush marks, and patches of untouched paper. Follow natural subject contours, depth layers, atmosphere, and light. Let brush marks overlap the photographic region by different amounts, and let selected photographic details extend into the painted region before dissolving. The boundary must be varied and gradual, never a hard cut, simple geometric mask, straight line, or uniform digital gradient.

Simplify the painted content into a subject-focused watercolor vignette and allow peripheral pigment to fade naturally into warm-white paper. Do not repeat the full composition. Do not create two panels, a gap, divider, white band, collage, frame, labels, torn-paper edges, shadows, or unrelated decoration.
```

## Quality check

### Mode 1

- the primary subject remains recognizable
- important composition and identity cues are preserved
- the artwork uses genuine selective watercolor interpretation rather than a uniform filter
- paint coverage does not reach every canvas edge
- white space is organic and intentionally distributed
- the painted edge fades through brushwork rather than a hard mask
- there is no torn paper, rectangular inset, frame, or drop shadow
- no region remains visibly photographic

### Mode 2

- the scene appears only once, with no repeated full image
- the requested content retains genuine source-photograph detail
- all non-retained content is recognizably rendered in watercolor
- landmarks and contours do not jump at the transition
- the transition follows the scene naturally and remains organically irregular
- there is no straight seam, gap, divider, white band, or separate panel
- the source aspect ratio is preserved and the image is not stretched
- there are no labels unless requested

## One-line definition

Create either a complete watercolor interpretation with no photographic regions, or one continuous hybrid that preserves selected original content while transforming everything else into aligned watercolor.
