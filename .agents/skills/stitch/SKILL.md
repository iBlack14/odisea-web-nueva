---
name: stitch-design
description: Guidelines and workflows for designing UI/UX with Google Stitch MCP in this project.
---

# Stitch UI/UX Design Workflow

This project is connected to **Google Stitch MCP** (`stitch-mcp`) for AI-assisted UI/UX design.

## Configured Environment
- **GCP Project**: `gen-lang-client-0326829183`
- **Package**: `stitch-mcp` (local dependency in `node_modules/stitch-mcp`)
- **Config locations**:
  - Plugin: `.agents/plugins/stitch/mcp_config.json`
  - Workspace: `.agents/mcp_config.json`
  - Root: `.mcp.json`

## Available Capabilities & Tools
1. **`list_projects`** / **`create_project`**: Manage Stitch design projects.
2. **`list_screens`** / **`get_screen`**: Inspect screens in a design workspace.
3. **`generate_screen_from_text`**: Generate new UI screens and layouts from text prompts.
4. **`extract_design_context`**: Extract Design DNA (colors, typography, spacing, components) to maintain consistency.
5. **`fetch_screen_code`**: Retrieve clean HTML/CSS/frontend code for any generated screen.
6. **`fetch_screen_image`**: Retrieve high-resolution renders of the designs.

## Recommended Designer Flow
1. **Ideate / Generate**: Use `generate_screen_from_text` to draft screens based on requirements.
2. **Extract DNA**: Use `extract_design_context` from the primary layout to keep theme consistency across other screens.
3. **Extract Code**: Fetch code via `fetch_screen_code` and integrate it into the web project structure.
