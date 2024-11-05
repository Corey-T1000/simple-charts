# Chart Style Generator

A powerful tool for creating and managing beautiful, accessible color palettes for data visualizations. Built with React, TypeScript, and Recharts.

![Chart Style Generator](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&h=600)

## Features

- 🎨 **Smart Color Import**
  - Import colors from CSS variables
  - Support for HSL and HEX formats
  - CSV and line-by-line hex value imports
  - Automatic color name detection

- 📊 **Live Chart Preview**
  - Real-time visualization updates
  - Multiple chart types (Line, Bar, Pie)
  - Light/Dark mode toggle
  - Responsive design

- 🔧 **Advanced Color Management**
  - Intelligent color palette suggestions
  - Accessibility-focused color combinations
  - Named color support
  - Easy color assignment interface

- 💾 **Export Options**
  - Export as CSS variables
  - Light and dark mode support
  - Ready-to-use in your projects

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chart-style-generator.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Guide

### Importing Colors

The generator supports multiple color import formats:

1. **CSS Variables**
   ```css
   --primary-500: 220 100% 50%;
   --accent-600: 280 80% 60%;
   ```

2. **Hex Values**
   ```
   F7F6F7, F1F0F2, DEDCDF
   ```
   or
   ```
   #F7F6F7
   #F1F0F2
   #DEDCDF
   ```

3. **CSS Files**
   - Drag and drop any CSS file containing color variables

### Creating Color Palettes

1. Import your base colors using any supported format
2. Use the color picker to assign colors to chart elements
3. Preview changes in real-time across different chart types
4. Use the "Suggest Colors" feature for accessible combinations
5. Export your finalized palette as CSS variables

### Best Practices

- Start with a core set of brand colors
- Use the color suggestion feature for accessible combinations
- Test your palette in both light and dark modes
- Keep color count minimal for clear data visualization
- Consider colorblind-friendly combinations

## Technical Details

### Built With

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts
- Lucide Icons

### Project Structure

```
src/
├── components/
│   ├── charts/           # Chart components
│   ├── ui/              # UI components
│   └── ...
├── lib/
│   ├── color-utils.ts   # Color manipulation utilities
│   ├── css-parser.ts    # CSS parsing logic
│   └── types.ts         # TypeScript definitions
└── ...
```

### Key Features Implementation

- **Color Parsing**: Supports multiple color formats and automatically converts between them
- **Accessibility**: Implements WCAG guidelines for color contrast
- **Real-time Preview**: Uses React state management for instant updates
- **Responsive Design**: Adapts to different screen sizes and orientations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Recharts](https://recharts.org/) for the charting library
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Lucide](https://lucide.dev/) for the icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Made with ⚡️ by [Your Name]