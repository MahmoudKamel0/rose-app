<!-- 
   ! under the edit
-->

## Tailwind Custom Classes Documentation

### Overview
This project extends the default **Tailwind CSS configuration** by defining a set of **custom utility classes** and **theme variables**.  
These classes improve design consistency, maintainability, and provide a clear visual identity across the app.
---

### Custom Theme Colors

| Class | Description | Example Usage |
|--------|--------------|----------------|
| `bg-maroon-600` | Deep rose/maroon background color used as the primary brand color. | `class="bg-maroon-600 text-white"` |
| `text-softpink-300` | Light pink text color for subtle accents or highlights. | `class="text-softpink-300"` |
| `border-maroon-400` | Medium maroon border used in inputs, buttons, and cards. | `class="border-maroon-400"` |

These custom color variables are defined using **OKLCH color model** for better contrast and accessibility.

---

### 🧱 Custom Border Radius

| Class | Description |
|--------|--------------|
| `rounded-10` | Custom border radius of `10px`. |
| `rounded-alert` | Used for alert components to provide a soft rounded style. |
| `rounded-xl` | Extended radius for cards and containers. |

Defined in the Tailwind theme under the `--radius-*` CSS variables.

---

### 🪟 Custom Width & Height Utilities

| Class | Property | Value |
|--------|-----------|--------|
| `w-input` | width | `327px` |
| `w-button` | width | `181px` |
| `h-button` | height | `46px` |

These utilities help maintain consistent sizing for forms and buttons.

---

### 🌗 Dark Mode Support

Custom variants have been added using:  
```css
@custom-variant dark (&:is(.dark *));
