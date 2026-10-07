# Sponsor visuals

The homepage sponsor strip is placed immediately after the hero and before Technical Departments. Nine background images were generated with the built-in imagegen tool and optimized to 900px WebP for the cards. These are thematic illustrations, not photographs of sponsors' actual premises or equipment. Original generated files remain in the Codex generated-images folder.

## Background files and generation prompts

Final files live in `public/sponsors/backgrounds/`.

Shared prompt for CAD, electronics, materials, technology, media, workwear, mechanical:

> Create one premium photorealistic website sponsor-card background, landscape 3:2. Subject: [subject below] Consistent visual series: cinematic premium industrial photography, graphite and midnight navy palette, subtle electric-blue rim lighting, refined aerospace engineering mood. No text, no lettering, no logos, no watermark, no people. Main subject in upper/right portion with lower-left dark negative space for separately overlaid website label. This is a background image, not a UI mockup.

| File | Subject |
| --- | --- |
| cad.webp | A detailed silver fixed-wing drone airframe in a professional CAD environment, exploded precision mechanical components and subtle blue technical construction lines. |
| electronics.webp | Macro photograph of a premium blue printed circuit board with a central microcontroller, intricate copper traces, and precisely soldered electronic components for drone avionics. |
| materials.webp | Macro still life of pristine spools of blue and graphite 3D printing filament with textured composite material samples, refined materials engineering studio. |
| technology.webp | A modern university technology incubator and aerospace research laboratory, glass partitions and clean prototype workbenches, architectural photography. |
| media.webp | Professional cinema camera and lens in an aerospace filming studio, distant blurred unmanned aircraft, elegant media production equipment. |
| workwear.webp | Premium navy technical work jacket on a torso mannequin, detailed reinforced seams and protective fabric texture, engineering workwear studio still life. |
| mechanical.webp | Close-up of precision metalworking tools shaping a curved aluminum panel in a clean workshop, restrained sparks, realistic mechanical craftsmanship. |

`simulation.webp` prompt:

> Create a premium photorealistic website sponsor-card background, landscape 3:2. Subject: a precision aerodynamic simulation of an unmanned aircraft with flowing cyan streamline visualization across a fine dark blue computational mesh. Cinematic macro technical photography mixed with realistic simulation visualization, graphite and midnight navy, subtle electric-blue highlights, refined aerospace engineering mood, clean composition, no text, no logos, no watermark. Main detail in upper and right portions; lower left dark uncluttered for separately overlaid website label. Save image for a website asset.

`printing.webp` prompt:

> Premium photorealistic background for a website sponsor card, landscape 3:2. A professional wide-format digital inkjet printer producing a rich blue abstract technical print on a clean paper roll, detailed print head and precise rollers in a commercial print workshop. Midnight navy and graphite palette with subtle electric-blue lighting, cinematic professional industrial photography, main detail on upper right, darker lower left for overlay. No text, letters, logos, watermark or people. Not a 3D printer.

## Original logo sources

Logos are stored locally in `public/sponsors/logos/`, with their original proportions and colors preserved.

- Altium: original header SVG extracted from https://www.altium.com/ (white logo displayed on a dark panel).
- Polymaker: https://shop.polymaker.com/cdn/shop/files/Polymaker_New_Logo.png?v=1756260800&width=564
- InnoPark: https://innopark.com.tr/assets/logo.png
- Printest: https://printestdijital.com/wp-content/uploads/2025/01/printest-logo.png
- Medyavuz: https://medyavuz.com/images/logo.png

- Dassault Systèmes: user-supplied logo, saved as `dassault-systemes.png`.
- SolidWorks: user-supplied logo, saved as `solidworks.png`.
- MathWorks: user-supplied logo, saved as `mathworks.png`.

The three supplied PNGs are copied unchanged. CSS frames the transparent vertical margins in the MathWorks and SolidWorks images, preserving the logo proportions and colors. Dassault Systèmes uses the existing CAD background.

Erva İş Elbiseleri and Kıratlıoğlu Kaporta use plain text names for now. No synthetic logos were created.

## Additional user-supplied sponsor logos

- Kahveci Otomotiv: `public/sponsors/logos/kahveci-otomotiv.png`, copied unchanged from the supplied image. Uses the existing mechanical background.
- Ceylan Composite: `public/sponsors/logos/ceylan-composite.png`, copied unchanged from the supplied image. Uses the existing materials background.

Both use taller logo panels to frame the supplied whitespace without distorting the logos. Category labels are translated into Turkish and English.
