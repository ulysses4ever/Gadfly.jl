var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": "Author = \"Tamas Nagy\""
},

{
    "location": "index.html#Gadfly.jl-1",
    "page": "Home",
    "title": "Gadfly.jl",
    "category": "section",
    "text": "Gadfly is a system for plotting and visualization written in Julia. It is based largely on Hadley Wickhams's ggplot2 for R and Leland Wilkinson's book The Grammar of Graphics. It was Daniel C. Jones' brainchild and is now maintained by the community."
},

{
    "location": "index.html#Package-features-1",
    "page": "Home",
    "title": "Package features",
    "category": "section",
    "text": "Renders publication quality graphics to SVG, PNG, Postscript, and PDF\nIntuitive and consistent plotting interface\nWorks with IJulia out of the box\nTight integration with DataFrames.jl\nInteractivity like panning, zooming, toggling powered by Snap.svg\nSupports a large number of common plot types"
},

{
    "location": "index.html#Quickstart-1",
    "page": "Home",
    "title": "Quickstart",
    "category": "section",
    "text": "The latest release of Gadfly can be installed from the Julia REPL prompt withjulia> Pkg.add(\"Gadfly\")This installs the package and any missing dependencies. Gadfly can be loaded withjulia> using GadflyNow that you have it loaded, check out the Tutorial for a tour of basic plotting and the various manual pages for more advanced usages."
},

{
    "location": "index.html#Manual-outline-1",
    "page": "Home",
    "title": "Manual outline",
    "category": "section",
    "text": "Pages = [\n    \"man/plotting.md\",\n    \"man/layers.md\",\n    \"man/backends.md\",\n    \"man/themes.md\"\n]\nDepth = 1"
},

{
    "location": "index.html#Credits-1",
    "page": "Home",
    "title": "Credits",
    "category": "section",
    "text": "Gadfly is predominantly the work of Daniel C. Jones who initiated the project and built out most of the infrastructure. The current package maintainers are Shashi Gowda and Tamas Nagy. Important contributions have also been made by Godisemo, Tim Holy, Darwin Darakananda, Simon Leblanc, Iain Dunning, Keno Fischer, Mattriks, and others."
},

{
    "location": "tutorial.html#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": "Author = \"Tamas Nagy, Daniel C. Jones, Simon Leblanc\""
},

{
    "location": "tutorial.html#Tutorial-1",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "section",
    "text": "Gadfly is an implementation of a \"grammar of graphics\" style statistical graphics system for Julia. This tutorial will outline general usage patterns and will give you a feel for the overall system.To begin, we need some data. Gadfly works best when the data is supplied in a DataFrame. In this tutorial, we'll pick and choose some examples from the RDatasets package.Let us use Fisher's iris dataset as a starting point.using Gadfly\nusing RDatasets\n\niris = dataset(\"datasets\", \"iris\")\nnothing # hideThe plot function in Gadfly is of the form:plot(data::DataFrame, mapping::Dict, elements::Element...)The first argument is the data to be plotted, the second is a dictionary mapping \"aesthetics\" to columns in the data frame, and this is followed by some number of elements, which are the nouns and verbs, so to speak, that form the grammar.Let's get to it.p = plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point);\nnothing # hideThis produces a Plot object. It can be saved to a file by drawing to one or more backends using draw.img = SVG(\"iris_plot.svg\", 6inch, 4inch)\ndraw(img, p)Now we have the following charming little SVG image.p # hideIf you are working at the REPL, a quicker way to see the image is to omit the semi-colon trailing plot.  This automatically renders the image to your default multimedia display, typically an internet browser.  No need to capture the output argument in this case.plot(iris, x=:SepalLength, y=:SepalWidth, Geom.point)Alternatively one can manually call display on a Plot object.  This workflow is necessary when display would not otherwise be called automatically.function get_to_it(d)\n  ppoint = plot(d, x=:SepalLength, y=:SepalWidth, Geom.point)\n  pline = plot(d, x=:SepalLength, y=:SepalWidth, Geom.line)\n  ppoint, pline\nend\nps = get_to_it(iris)\nmap(display, ps)For the rest of the demonstrations, we'll simply omit the trailing semi-colon for brevity.In this plot we've mapped the x aesthetic to the SepalLength column and the y aesthetic to the SepalWidth. The last argument, Geom.point, is a geometry element which takes bound aesthetics and render delightful figures. Adding other geometries produces layers, which may or may not result in a coherent plot.plot(iris, x=:SepalLength, y=:SepalWidth,\n         Geom.point, Geom.line)This is the grammar of graphics equivalent of \"colorless green ideas sleep furiously\". It is valid grammar, but not particularly meaningful."
},

{
    "location": "tutorial.html#Color-1",
    "page": "Tutorial",
    "title": "Color",
    "category": "section",
    "text": "Let's do add something meaningful by mapping the color aesthetic.plot(iris, x=:SepalLength, y=:SepalWidth, color=:Species,\n         Geom.point)Ah, a scientific discovery: Setosa has short but wide sepals!Color scales in Gadfly by default are produced from perceptually uniform colorspaces (LUV/LCHuv or LAB/LCHab), though it supports RGB, HSV, HLS, XYZ, and converts arbitrarily between these. Of course, CSS/X11 named colors work too: \"old lace\", anyone?"
},

{
    "location": "tutorial.html#Scale-transforms-1",
    "page": "Tutorial",
    "title": "Scale transforms",
    "category": "section",
    "text": "Scale transforms also work as expected. Let's look at some data where this is useful.mammals = dataset(\"MASS\", \"mammals\")\nplot(mammals, x=:Body, y=:Brain, label=:Mammal, Geom.point, Geom.label)This is no good, the large animals are ruining things for us. Putting both axis on a log-scale clears things up.plot(mammals, x=:Body, y=:Brain, label=:Mammal,\n         Geom.point, Geom.label, Scale.x_log10, Scale.y_log10)"
},

{
    "location": "tutorial.html#Discrete-scales-1",
    "page": "Tutorial",
    "title": "Discrete scales",
    "category": "section",
    "text": "Since all continuous analysis is just degenerate discrete analysis, let's take a crack at the latter using some fuel efficiency data.gasoline = dataset(\"Ecdat\", \"Gasoline\")\n\nplot(gasoline, x=:Year, y=:LGasPCar, color=:Country,\n         Geom.point, Geom.line)We could have added Scale.x_discrete explicitly, but this is detected and the right default is chosen. This is the case with most of elements in the grammar: we've omitted Scale.x_continuous and Scale.y_continuous in the previous plots, as well as Coord.cartesian, and guide elements such as Guide.xticks, Guide.xlabel, and so on. As much as possible the system tries to fill in the gaps with reasonable defaults."
},

{
    "location": "tutorial.html#Rendering-1",
    "page": "Tutorial",
    "title": "Rendering",
    "category": "section",
    "text": "Gadfly uses a custom graphics library called Compose, which is an attempt at a more elegant, purely functional take on the R grid package. It allows mixing of absolute and relative units and complex coordinate transforms. The primary backend is a native SVG generator (almost native: it uses pango to precompute text extents), though there is also a Cairo backend. See Backends for more details.Building graphics declaratively let's you do some fun things. Like stick two plots together:fig1a = plot(iris, x=\"SepalLength\", y=\"SepalWidth\", Geom.point)\nfig1b = plot(iris, x=\"SepalWidth\", Geom.bar)\nfig1 = hstack(fig1a, fig1b)Ultimately this will make more complex visualizations easier to build. For example, facets, plots within plots, and so on. See Layers and Stacks for more details."
},

{
    "location": "tutorial.html#Interactivity-1",
    "page": "Tutorial",
    "title": "Interactivity",
    "category": "section",
    "text": "One advantage of generating our own SVG is that the files are much more compact than those produced by Cairo, by virtue of having a higher level API. Another advantage is that we can annotate our SVG output and embed Javascript code to provide some level of dynamism.Though not a replacement for full-fledged custom interactive visualizations of the sort produced by d3, this sort of mild interactivity can improve a lot of standard plots. The fuel efficiency plot is made more clear by toggling off some of the countries, for example."
},

{
    "location": "man/plotting.html#",
    "page": "Plotting",
    "title": "Plotting",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "man/plotting.html#Plotting-1",
    "page": "Plotting",
    "title": "Plotting",
    "category": "section",
    "text": "Most interaction with Gadfly is through the plot function. Plots are described by binding data to aesthetics, and specifying a number of plot elements including Scales, Coordinates, Guides, and Geometries. Aesthetics are a set of special named variables that are mapped to plot geometry. How this mapping occurs is defined by the plot elements.This \"grammar of graphics\" approach tries to avoid arcane incantations and special cases, instead approaching the problem as if one were drawing a wiring diagram: data is connected to aesthetics, which act as input leads, and elements, each self-contained with well-defined inputs and outputs, are connected and combined to produce the desired result."
},

{
    "location": "man/plotting.html#Plotting-arrays-1",
    "page": "Plotting",
    "title": "Plotting arrays",
    "category": "section",
    "text": "If no plot elements are defined, point geometry is added by default. The point geometry takes as input the x and y aesthetics. So all that's needed to draw a scatterplot is to bind x and y.using Gadfly\nsrand(12345)# E.g.\np = # hide\nplot(x=rand(10), y=rand(10))(Image: )Multiple elements can use the same aesthetics to produce different output. Here the point and line geometries act on the same data and their results are layered.# E.g.\nplot(x=rand(10), y=rand(10), Geom.point, Geom.line)More complex plots can be produced by combining elements.# E.g.\nplot(x=1:10, y=2.^rand(10),\n     Scale.y_sqrt, Geom.point, Geom.smooth,\n     Guide.xlabel(\"Stimulus\"), Guide.ylabel(\"Response\"), Guide.title(\"Dog Training\"))To generate an image file from a plot, use the draw function. Gadfly supports a number of drawing Backends."
},

{
    "location": "man/plotting.html#Plotting-data-frames-1",
    "page": "Plotting",
    "title": "Plotting data frames",
    "category": "section",
    "text": "The DataFrames package provides a powerful means of representing and manipulating tabular data. They can be used directly in Gadfly to make more complex plots simpler and easier to generate.In this form of plot, a data frame is passed to as the first argument, and columns of the data frame are bound to aesthetics by name or index.# Signature for the plot applied to a data frames.\nplot(data::AbstractDataFrame, elements::Element...; mapping...)The RDatasets package collects example data sets from R packages. We'll use that here to generate some example plots on realistic data sets. An example data set is loaded into a data frame using the dataset function.using RDatasets# E.g.\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\", Geom.point)# E.g.\nplot(dataset(\"car\", \"SLID\"), x=\"Wages\", color=\"Language\", Geom.histogram)Along with less typing, using data frames to generate plots allows the axis and guide labels to be set automatically."
},

{
    "location": "man/plotting.html#Functions-and-Expressions-1",
    "page": "Plotting",
    "title": "Functions and Expressions",
    "category": "section",
    "text": "Along with the standard plot function, Gadfly has some special forms to make plotting functions and expressions more convenient.plot(f::Function, a, b, elements::Element...)\n\nplot(fs::Array, a, b, elements::Element...)Some special forms of plot exist for quickly generating 2d plots of functions.# E.g.\nplot([sin, cos], 0, 25)"
},

{
    "location": "man/layers.html#",
    "page": "Layers and Stacks",
    "title": "Layers and Stacks",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "man/layers.html#Layers-and-Stacks-1",
    "page": "Layers and Stacks",
    "title": "Layers and Stacks",
    "category": "section",
    "text": "Gadfly also supports more advanced plot composition techniques like layering and stacking."
},

{
    "location": "man/layers.html#Layers-1",
    "page": "Layers and Stacks",
    "title": "Layers",
    "category": "section",
    "text": "Draw multiple layers onto the same plot withplot(layer(x=rand(10), y=rand(10), Geom.point),\n     layer(x=rand(10), y=rand(10), Geom.line))Or if your data is in a DataFrame:plot(my_data, layer(x=\"some_column1\", y=\"some_column2\", Geom.point),\n              layer(x=\"some_column3\", y=\"some_column4\", Geom.line))You can also pass different data frames to each layers:layer(another_dataframe, x=\"col1\", y=\"col2\", Geom.point)Ordering of layers can be controlled with the order keyword. A higher order number will cause a layer to be drawn on top of any layers with a lower number. If not specified, default order for a layer is 0.plot(layer(x=rand(10), y=rand(10), Geom.point, order=1),\n     layer(x=rand(10), y=rand(10), Geom.line, order=2))Guide attributes may be added to a multi-layer plots:plt=plot(layer(x=rand(10), y=rand(10), Geom.point),\n         layer(x=rand(10), y=rand(10), Geom.line),\n         Guide.XLabel(\"XLabel\"),\n         Guide.YLabel(\"YLabel\"),\n         Guide.Title(\"Title\"));"
},

{
    "location": "man/layers.html#Stacks-1",
    "page": "Layers and Stacks",
    "title": "Stacks",
    "category": "section",
    "text": "Plots can also be stacked horizontally with hstack or vertically with vstack, and arranged into a rectangular array with gridstack. This allows more customization in regards to tick marks, axis labeling, and other plot details than is available with Geom.subplot_grid.  Use title to add a descriptive string at the top.p1 = plot(x=[1,2,3], y=[4,5,6])\np2 = plot(x=[1,2,3], y=[6,7,8])\nvstack(p1,p2)\n\np3 = plot(x=[5,7,8], y=[8,9,10])\np4 = plot(x=[5,7,8], y=[10,11,12])\n\n# these two are equivalent\nvstack(hstack(p1,p2),hstack(p3,p4))\ngridstack([p1 p2; p3 p4])\n\ntitle(\"My great data\", hstack(p3,p4))"
},

{
    "location": "man/backends.html#",
    "page": "Backends",
    "title": "Backends",
    "category": "page",
    "text": "Author = \"Daniel C. Jones, Tamas Nagy\""
},

{
    "location": "man/backends.html#Backends-1",
    "page": "Backends",
    "title": "Backends",
    "category": "section",
    "text": "Gadfly supports writing to the SVG and SVGJS backends out of the box. However, the PNG, PDF, and PS backends require Julia's bindings to Cairo. It can be installed withPkg.add(\"Cairo\")Additionally, complex layouts involving text are more accurate when Pango and Fontconfig are installed."
},

{
    "location": "man/backends.html#Changing-the-backend-1",
    "page": "Backends",
    "title": "Changing the backend",
    "category": "section",
    "text": "Drawing to different backends is easy# define a plot\nmyplot = plot(..)\n\n# draw on every available backend\ndraw(SVG(\"myplot.svg\", 4inch, 3inch), myplot)\ndraw(SVGJS(\"myplot.svg\", 4inch, 3inch), myplot)\ndraw(PNG(\"myplot.png\", 4inch, 3inch), myplot)\ndraw(PDF(\"myplot.pdf\", 4inch, 3inch), myplot)\ndraw(PS(\"myplot.ps\", 4inch, 3inch), myplot)\ndraw(PGF(\"myplot.tex\", 4inch, 3inch), myplot)note: Note\nThe SVGJS backend writes SVG with embedded javascript. There are a couple subtleties with using the output from this backend.Drawing to the backend works like any otherdraw(SVGJS(\"mammals.js.svg\", 6inch, 6inch), p)If included with an <img> tag, it will display as a static SVG image<img src=\"mammals.js.svg\"/>For the interactive javascript features to be enabled, the output either needs to be included inline in the HTML page, or included with an object tag<object data=\"mammals.js.svg\" type=\"image/svg+xml\"></object>A div element must be placed, and the draw function defined in mammals.js must be passed the id of this element, so it knows where in the document to place the plot."
},

{
    "location": "man/backends.html#IJulia-1",
    "page": "Backends",
    "title": "IJulia",
    "category": "section",
    "text": "The IJulia project adds Julia support to Jupyter. This includes a browser based notebook that can inline graphics and plots. Gadfly works out of the box with IJulia, with or without drawing explicity to a backend.Without a explicit call to draw (i.e. just calling plot), the D3 backend is used with a default plot size. The default plot size can be changed with set_default_plot_size.# E.g.\nset_default_plot_size(12cm, 8cm)"
},

{
    "location": "man/themes.html#",
    "page": "Themes",
    "title": "Themes",
    "category": "page",
    "text": "Author = \"Daniel C. Jones, Shashi Gowda\""
},

{
    "location": "man/themes.html#Themes-1",
    "page": "Themes",
    "title": "Themes",
    "category": "section",
    "text": "Many parameters controlling the appearance of plots can be overridden by passing a Theme object to the plot function. Or setting the Theme as the current theme using push_theme (see also pop_theme and with_theme below).The constructor for Theme takes zero or more named arguments each of which overrides the default value of the field."
},

{
    "location": "man/themes.html#The-Theme-stack-1",
    "page": "Themes",
    "title": "The Theme stack",
    "category": "section",
    "text": "Gadfly maintains a stack of themes and applies theme values from the topmost theme in the stack. This can be useful when you want to set a theme for multiple plots and then switch back to a previous theme.push_theme(t::Theme) and pop_theme() will push and pop from this stack respectively. You can use with_theme(f, t::Theme) to set a theme as the current theme and call f()."
},

{
    "location": "man/themes.html#style-1",
    "page": "Themes",
    "title": "style",
    "category": "section",
    "text": "You can use style to override the fields on top of the current theme at the top of the stack. style(...) returns a Theme. So it can be used with push_theme and with_theme."
},

{
    "location": "man/themes.html#Parameters-1",
    "page": "Themes",
    "title": "Parameters",
    "category": "section",
    "text": "These parameters can either be used with Theme or styledefault_color: When the color aesthetic is not bound, geometry uses this color for drawing. (Color)\ndefault_point_size: Size of points in the point and boxplot geometry.  (Measure)\nline_width: Width of lines in the line geometry. (Measure)\nline_style: Style of lines in the line geometry. (Symbol in :solid, :dash, :dot, :dashdot, :dashdotdot, or Vector of Measures)\npanel_fill: Background color used in the main plot panel. ( Color or Nothing)\npanel_opacity: Opacity of the plot background panel. (Float in [0.0, 1.0])\npanel_stroke: Border color of the main plot panel. (Color or Nothing)\nbackground_color: Background color for the entire plot. If nothing, no background. (Color or Nothing)\nplot_padding: How much padding should be put around the plot as a whole (Measure)\ngrid_color: Color of grid lines. (Color or Nothing)\ngrid_color_focused: In the D3 backend, mousing over the plot makes the grid lines emphasised by transitioning to this color. (Color or Nothing)\ngrid_line_width: Width of grid lines. (Measure)\nminor_label_font: Font used for minor labels such as guide entries and labels. (String)\nminor_label_font_size: Font size used for minor labels. (Measure)\nminor_label_color: Color used for minor labels. (Color)\nmajor_label_font: Font used for major labels such as guide titles and axis labels. (String)\nmajor_label_font_size: Font size used for major labels. (Measure)\nmajor_label_color: Color used for major labels. (Color)\nkey_position: Where key should be placed relative to the plot panel. One of :left, :right, :top, :bottom, or :none. Setting to :none disables the key. (Symbol)\nkey_title_font: Font used for titles of keys. (String)\nkey_title_font_size: Font size used for key titles. (Measure)\nkey_title_color: Color used for key titles. (Color)\nkey_label_font: Font used for key entry labels. (String)\nkey_label_font_size: Font size used for key entry labels. (Measure)\nkey_label_color: Color used for key entry labels. (Color)\nkey_max_columns: Maximum number of columns for key entry labels. (Int)\nbar_spacing: Spacing between bars in Geom.bar. (Measure)\nboxplot_spacing: Spacing between boxplots in Geom.boxplot. (Measure)\nerrorbar_cap_length: Length of caps on error bars. (Measure)\nhighlight_width: Width of lines drawn around plot geometry like points, and boxplot rectangles. (Measure)\ndiscrete_highlight_color and continuous_highlight_color: Color used to outline plot geometry. This is a function that alters (e.g. darkens) the fill color of the geometry. (Function)\nlowlight_color: Color used to draw background geometry, such as Geom.ribbon. This is a function that alters the fill color of the geometry. (Function)\nlowlight_opacity: Opacity of background geometry such as Geom.ribbon. (Float64)\nmiddle_color: Color altering function used to draw the midline in boxplots. (Function)\nmiddle_width: Width of the middle line in boxplots. (Measure)\nguide_title_position: One of :left, :center, :right indicating the  placement of the title of color key guides. (Symbol)\ncolorkey_swatch_shape: The shape used in color swatches in the color key guide. Either :circle or :square  (Symbol)\nbar_highlight: Color used to stroke bars in bar plots. If a function is given, it's used to transform the fill color of the bars to obtain a stroke color. (Function, Color, or Nothing)\ndiscrete_color_scheme: A DiscreteColorScale see Scale.color_discrete_hue\ncontinuous_color_scheme: A ContinuousColorScale see Scale.color_continuous"
},

{
    "location": "man/themes.html#Examples-1",
    "page": "Themes",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(12345)\ndark_panel = Theme(\n    panel_fill=colorant\"black\",\n    default_color=colorant\"orange\"\n)\n\nplot(x=rand(10), y=rand(10), dark_panel)\nSetting the font to Computer Modern to create a LaTeX-like look, and choosing a font size:Gadfly.push_theme(dark_panel)\n\np = plot(x=rand(10), y=rand(10),\n     style(major_label_font=\"CMU Serif\",minor_label_font=\"CMU Serif\",\n           major_label_font_size=16pt,minor_label_font_size=14pt))\n\n# can plot more plots here...\n\nGadfly.pop_theme()\n\np # hideSame effect can be had with with_themeGadfly.with_theme(dark_panel) do\n\n  plot(x=rand(10), y=rand(10),\n       style(major_label_font=\"CMU Serif\",minor_label_font=\"CMU Serif\",\n             major_label_font_size=16pt,minor_label_font_size=14pt))\nend\nnothing # hideor\nGadfly.push_theme(dark_panel)\n\nGadfly.with_theme(\n       style(major_label_font=\"CMU Serif\",minor_label_font=\"CMU Serif\",\n             major_label_font_size=16pt,minor_label_font_size=14pt)) do\n\n  plot(x=rand(10), y=rand(10))\n\nend\n\nGadfly.pop_theme()\nnothing # hide"
},

{
    "location": "man/themes.html#Named-themes-1",
    "page": "Themes",
    "title": "Named themes",
    "category": "section",
    "text": "To register a theme by name, you can extend Gadfly.get_theme(::Val{:theme_name}) to return a Theme object.Gadfly.get_theme(::Val{:orange}) =\n    Theme(default_color=colorant\"orange\")\n\nGadfly.with_theme(:orange) do\n  plot(x=[1:10;], y=rand(10), Geom.bar)\nendGadfly comes built in with 2 named themes: :default and :dark. You can also set a theme to use by default by setting the GADFLY_THEME environment variable before loading Gadfly."
},

{
    "location": "man/themes.html#The-Dark-theme-1",
    "page": "Themes",
    "title": "The Dark theme",
    "category": "section",
    "text": "This is one of the two themes the ship with Gadfly the other being :default. Here are a few plots that use the dark theme.Gadfly.push_theme(:dark)\nnothing # hideplot(dataset(\"datasets\", \"iris\"),\n    x=\"SepalLength\", y=\"SepalWidth\", color=\"Species\", Geom.point)using RDatasets\n\ngasoline = dataset(\"Ecdat\", \"Gasoline\")\n\nplot(gasoline, x=:Year, y=:LGasPCar, color=:Country,\n         Geom.point, Geom.line)using DataFrames\n\nxs = 0:0.1:20\n\ndf_cos = DataFrame(\n    x=xs,\n    y=cos(xs),\n    ymin=cos(xs) .- 0.5,\n    ymax=cos(xs) .+ 0.5,\n    f=\"cos\"\n)\n\ndf_sin = DataFrame(\n    x=xs,\n    y=sin(xs),\n    ymin=sin(xs) .- 0.5,\n    ymax=sin(xs) .+ 0.5,\n    f=\"sin\"\n)\n\ndf = vcat(df_cos, df_sin)\np = plot(df, x=:x, y=:y, ymin=:ymin, ymax=:ymax, color=:f, Geom.line, Geom.ribbon)using Distributions\n\nX = rand(MultivariateNormal([0.0, 0.0], [1.0 0.5; 0.5 1.0]), 10000);\nplot(x=X[1,:], y=X[2,:], Geom.hexbin(xbincount=100, ybincount=100))Gadfly.pop_theme()"
},

{
    "location": "lib/dev_pipeline.html#",
    "page": "Rendering Pipeline",
    "title": "Rendering Pipeline",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/dev_pipeline.html#Rendering-Pipeline-1",
    "page": "Rendering Pipeline",
    "title": "Rendering Pipeline",
    "category": "section",
    "text": "using DataFrames\nusing Colors\nusing Compose\nusing RDatasets\nusing Showoff\nusing GadflyHow does the function calldf = dataset(\"ggplot2\", \"diamonds\")\np = plot(df,\n         x = :Price, color = :Cut,\n		 Stat.histogram,\n		 Geom.bar)actually get turned into the following plot?df = dataset(\"ggplot2\", \"diamonds\")\np = plot(df,\n         x = :Price, color = :Cut,\n		 Stat.histogram,\n		 Geom.bar)p # hide"
},

{
    "location": "lib/dev_pipeline.html#The-10,000-foot-View-1",
    "page": "Rendering Pipeline",
    "title": "The 10,000-foot View",
    "category": "section",
    "text": "The rendering pipeline transforms a plot specification into a Compose scene graph that contains a set of guides (e.g. axis ticks, color keys) and one or more layers of geometry (e.g. points, lines). The specification of each layer hasa data source (e.g. dataset(\"ggplot2\", \"diamonds\"))\na geometry to represent the layer's data (e.g. point, line, etc.)\nmappings to associate aesthetics of the geometry with elements of the data source (e.g.  :color => :Cut)\nlayer-wise statistics (optional) to be applied to the layer's dataAll layers of a plot share the sameCoordinates for the geometry (e.g. cartesian, polar, etc.)\naxis Scales (e.g. loglog, semilog, etc.)\nplot-wise Statistics (optional) to be applied to all layers\nGuidesA full plot specification must describe these shared elements as well as all the layer specifications. In the example above, we see that only the data source, statistics, geometry, and mapping are specified. The missing elements are either inferred from the data (e.g. categorical values in df[:Cut] implies a discrete color scale), or assumed using defaults (e.g. continuous x-axis scale). For example, invoking plot with all the elements will look something likep = plot(layer(df,\n               x = :Price, color = :Cut,\n		       Stat.histogram,\n		       Geom.bar),\n	  	 Scale.x_continuous,\n		 Scale.color_discrete,\n		 Coord.cartesian,\n		 Guide.xticks, Guide.yticks,\n		 Guide.xlabel(\"Price\"),\n		 Guide.colorkey(\"Cut\"))Once a full plot specification is filled out, the rendering process proceeds as follows:(Image: )For each layer in the plot, we first map subsets of the data source to a Data object. The Price and Cut columns of the diamond dataset are mapped to the :x and :color fields of Data, respectively.\nScales are applied to the data to obtain plottable aesthetics. Scale.x_continuous keeps the values of df[:Price] unchanged, while Scale.color_discrete_hue maps the unique elements of df[:Cut] (an array of strings) to actual color values.\nThe aesthetics are transformed by layer-wise and plot-wise statistics, in order. Stat.histogram replaces the x field of the aesthetics with bin positions, and sets the y field with the corresponding counts.\nUsing the position aesthetics from all layers, we create a Compose context with a coordinate system that fits the data to screen coordinates. Coord.cartesian creates a Compose context that maps a vertical distance of 3000 counts to about two inches in the rendered plot.\nEach layer renders its own geometry.\nFinally, we compute the layout of the guides and render them on top of the plot context."
},

{
    "location": "lib/dev_pipeline.html#More-Detailed-Walkthrough-1",
    "page": "Rendering Pipeline",
    "title": "More Detailed Walkthrough",
    "category": "section",
    "text": ""
},

{
    "location": "lib/dev_pipeline.html#Data-Source-to-Aesthetics-1",
    "page": "Rendering Pipeline",
    "title": "Data Source to Aesthetics",
    "category": "section",
    "text": ""
},

{
    "location": "lib/dev_pipeline.html#Aesthetics-to-Geometry-1",
    "page": "Rendering Pipeline",
    "title": "Aesthetics to Geometry",
    "category": "section",
    "text": ""
},

{
    "location": "lib/dev_pipeline.html#Rendering-Geometry-1",
    "page": "Rendering Pipeline",
    "title": "Rendering Geometry",
    "category": "section",
    "text": ""
},

{
    "location": "lib/dev_pipeline.html#Guide-Layout-1",
    "page": "Rendering Pipeline",
    "title": "Guide Layout",
    "category": "section",
    "text": ""
},

{
    "location": "lib/geometries.html#",
    "page": "Geometries",
    "title": "Geometries",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geometries.html#Geometries-1",
    "page": "Geometries",
    "title": "Geometries",
    "category": "section",
    "text": "Geometries are responsible for actually doing the drawing. A geometry takes as input one or more aesthetics, and used data bound to these aesthetics to draw things. For instance, the Geom.point geometry draws points using the x and y aesthetics, while the Geom.line geometry draws lines with those same two aesthetics."
},

{
    "location": "lib/geometries.html#Available-Geometries-1",
    "page": "Geometries",
    "title": "Available Geometries",
    "category": "section",
    "text": "Pages = map(file -> joinpath(\"geoms\", file), readdir(\"geoms\"))\nDepth = 1"
},

{
    "location": "lib/geoms/geom_abline.html#",
    "page": "Geom.abline",
    "title": "Geom.abline",
    "category": "page",
    "text": "Author = \"Ben J. Arthur\""
},

{
    "location": "lib/geoms/geom_abline.html#Geom.abline-1",
    "page": "Geom.abline",
    "title": "Geom.abline",
    "category": "section",
    "text": "For each corresponding pair of elements in intercept and slope, draw the lines y = slope * x + intercept across the plot canvas.Currently does not support non-linear Scale transformations."
},

{
    "location": "lib/geoms/geom_abline.html#Aesthetics-1",
    "page": "Geom.abline",
    "title": "Aesthetics",
    "category": "section",
    "text": "intercept: Y-axis intercepts, defaults to [0]\nslope: rise over run, defaults to [1]"
},

{
    "location": "lib/geoms/geom_abline.html#Arguments-1",
    "page": "Geom.abline",
    "title": "Arguments",
    "category": "section",
    "text": "color: Color of the lines.\nsize: Width of the lines.\nstyle: Style of the lines."
},

{
    "location": "lib/geoms/geom_abline.html#Examples-1",
    "page": "Geom.abline",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly, RDatasets, Compose\nGadfly.set_default_plot_size(14cm, 10cm)plot(dataset(\"ggplot2\", \"mpg\"), x=\"Cty\", y=\"Hwy\", label=\"Model\", Geom.point, Geom.label,\n    intercept=[0], slope=[1], Geom.abline(color=\"red\", style=:dash),\n    Guide.annotation(compose(context(), text(6,4, \"y=x\", hleft, vtop), fill(colorant\"red\"))))"
},

{
    "location": "lib/geoms/geom_bar.html#",
    "page": "Geom.bar",
    "title": "Geom.bar",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_bar.html#Geom.bar-1",
    "page": "Geom.bar",
    "title": "Geom.bar",
    "category": "section",
    "text": "Draw bar plots. This geometry works on pre-summarized data such as counts. To draw histograms from a series of observations, add Stat.histogram to the plot, or use the convenient geometry Geom.histogram."
},

{
    "location": "lib/geoms/geom_bar.html#Aesthetics-1",
    "page": "Geom.bar",
    "title": "Aesthetics",
    "category": "section",
    "text": "y: Height of each bar.\ncolor (optional): Group categorically by color.Eitherx: Position of each bar.Orxmin: Starting x positions for each bar.\nxmax: End x positions for each bar.If x is given, a bar will be drawn at each x value, specifying both xmin and xmax allows bars of variable width to be drawn."
},

{
    "location": "lib/geoms/geom_bar.html#Arguments-1",
    "page": "Geom.bar",
    "title": "Arguments",
    "category": "section",
    "text": "position: Either :stack or :dodge. If the color aesthetic is bound this determines how bars of different colors should be arranged: stacked on top of each other, or placed side by side.\norientation: Either :vertical (default) or :horizontal. If :horizontal, then the required aesthetics are y or ymin/ymax."
},

{
    "location": "lib/geoms/geom_bar.html#Examples-1",
    "page": "Geom.bar",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)plot(dataset(\"HistData\", \"ChestSizes\"), x=\"Chest\", y=\"Count\", Geom.bar)"
},

{
    "location": "lib/geoms/geom_beeswarm.html#",
    "page": "Geom.beeswarm",
    "title": "Geom.beeswarm",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_beeswarm.html#Geom.beeswarm-1",
    "page": "Geom.beeswarm",
    "title": "Geom.beeswarm",
    "category": "section",
    "text": "Plot points, shifting them on the x- or y-axis to avoid overlaps."
},

{
    "location": "lib/geoms/geom_beeswarm.html#Arguments-1",
    "page": "Geom.beeswarm",
    "title": "Arguments",
    "category": "section",
    "text": "orientation: :horizontal or :vertical.  Points will be shifted on the y-axis to avoid overlap if orientation in horizontal, and on the x-axis, if vertical.\npadding: Minimum distance between two points."
},

{
    "location": "lib/geoms/geom_beeswarm.html#Aesthetics-1",
    "page": "Geom.beeswarm",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position.\ny: Y-axis position.\ncolor (optional): Point color (categorial or continuous)."
},

{
    "location": "lib/geoms/geom_beeswarm.html#Examples-1",
    "page": "Geom.beeswarm",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)# Binding categorial data to x\nplot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.beeswarm)"
},

{
    "location": "lib/geoms/geom_boxplot.html#",
    "page": "Geom.boxplot",
    "title": "Geom.boxplot",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_boxplot.html#Geom.boxplot-1",
    "page": "Geom.boxplot",
    "title": "Geom.boxplot",
    "category": "section",
    "text": "Draw boxplots."
},

{
    "location": "lib/geoms/geom_boxplot.html#Aesthetics-1",
    "page": "Geom.boxplot",
    "title": "Aesthetics",
    "category": "section",
    "text": "Aesthetics used directly:x\nmiddle\nlower_hinge\nupper_hinge\nlower_fence\nupper_fence\noutliersWith default statistic Stat.boxplot, only the following aesthetics need to be defined:x (optional): Group categorically on the X-axis.\ny: Sample from which to draw the boxplot."
},

{
    "location": "lib/geoms/geom_boxplot.html#Examples-1",
    "page": "Geom.boxplot",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.boxplot)"
},

{
    "location": "lib/geoms/geom_contour.html#",
    "page": "Geom.contour",
    "title": "Geom.contour",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/geoms/geom_contour.html#Geom.contour-1",
    "page": "Geom.contour",
    "title": "Geom.contour",
    "category": "section",
    "text": "Draw contours of a 2D function or a matrix."
},

{
    "location": "lib/geoms/geom_contour.html#Aesthetics-1",
    "page": "Geom.contour",
    "title": "Aesthetics",
    "category": "section",
    "text": "z: 2D function or a matrix that represent \"heights\" relative to to the x-y plane.\nx (optional): Vector of X-coordinates.  If z is a matrix, then the length of x must be equal to the number of rows in z.\ny (optional): Vector of Y-coordinates.  If z is a matrix, then the length of y must be equal to the number of columns in z."
},

{
    "location": "lib/geoms/geom_contour.html#Arguments-1",
    "page": "Geom.contour",
    "title": "Arguments",
    "category": "section",
    "text": "levels (optional): Sets the number of contours to draw, defaults to 15.  It takes either a vector of contour levels;  an integer that specifies the number of contours to draw;  or a function which inputs z and outputs either a vector or an integer."
},

{
    "location": "lib/geoms/geom_contour.html#Examples-1",
    "page": "Geom.contour",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(z=(x,y) -> x*exp(-(x-round(Int, x))^2-y^2),\n     x=linspace(-8,8,150), y=linspace(-2,2,150), Geom.contour)volcano = Matrix{Float64}(dataset(\"datasets\", \"volcano\"))\nplot(z=volcano, Geom.contour)plot(z=volcano, Geom.contour(levels=[110.0, 150.0, 180.0, 190.0]))plot(z=volcano, x=collect(0.0:10:860.0), y=collect(0.0:10:600.0),\n     Geom.contour(levels=2))"
},

{
    "location": "lib/geoms/geom_density2d.html#",
    "page": "Geom.density2d",
    "title": "Geom.density2d",
    "category": "page",
    "text": "Author = \"Ben J. Arthur\""
},

{
    "location": "lib/geoms/geom_density2d.html#Geom.density2d-1",
    "page": "Geom.density2d",
    "title": "Geom.density2d",
    "category": "section",
    "text": "Draw a kernel density estimate from data. An alias for Geom.contour with Stat.density2d."
},

{
    "location": "lib/geoms/geom_density2d.html#Aesthetics-1",
    "page": "Geom.density2d",
    "title": "Aesthetics",
    "category": "section",
    "text": "x, y: Sample to draw density estimate from."
},

{
    "location": "lib/geoms/geom_density2d.html#Arguments-1",
    "page": "Geom.density2d",
    "title": "Arguments",
    "category": "section",
    "text": "bandwidth:  See Geom.density.\nlevels:  See Geom.contour."
},

{
    "location": "lib/geoms/geom_density2d.html#Examples-1",
    "page": "Geom.density2d",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nusing Distributions\nGadfly.set_default_plot_size(14cm, 8cm)plot(x=rand(Rayleigh(2),1000), y=rand(Rayleigh(2),1000),\n    Geom.density2d(levels = x->maximum(x)*0.5.^collect(1:2:8)), Geom.point,\n    Theme(key_position=:none),\n    Scale.color_continuous(colormap=x->colorant\"red\"))"
},

{
    "location": "lib/geoms/geom_density.html#",
    "page": "Geom.density",
    "title": "Geom.density",
    "category": "page",
    "text": "Author = \"Daniel C. Jones, Tamas Nagy\""
},

{
    "location": "lib/geoms/geom_density.html#Geom.density-1",
    "page": "Geom.density",
    "title": "Geom.density",
    "category": "section",
    "text": "Draw a kernel density estimate from data. An alias for Geom.line with Stat.density."
},

{
    "location": "lib/geoms/geom_density.html#Aesthetics-1",
    "page": "Geom.density",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Sample to draw density estimate from."
},

{
    "location": "lib/geoms/geom_density.html#Arguments-1",
    "page": "Geom.density",
    "title": "Arguments",
    "category": "section",
    "text": "bandwidth: How closely the density estimate should mirror the data. Larger values will smooth the density estimate out."
},

{
    "location": "lib/geoms/geom_density.html#Examples-1",
    "page": "Geom.density",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nusing Distributions\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.density)plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\", Geom.density)# adjusting bandwidth manually\ndist = MixtureModel(Normal, [(0.5, 0.2), (1, 0.1)])\nxs = rand(dist, 10^5)\nplot(layer(x=xs, Geom.density, Theme(default_color=colorant\"orange\")), \nlayer(x=xs, Geom.density(bandwidth=0.0003), Theme(default_color=colorant\"green\")),\nlayer(x=xs, Geom.density(bandwidth=0.25), Theme(default_color=colorant\"purple\")),\nGuide.manual_color_key(\"bandwidth\", [\"auto\", \"bw=0.0003\", \"bw=0.25\"], [\"orange\", \"green\", \"purple\"]))"
},

{
    "location": "lib/geoms/geom_errorbar.html#",
    "page": "Geom.errorbar",
    "title": "Geom.errorbar",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_errorbar.html#Geom.errorbar-1",
    "page": "Geom.errorbar",
    "title": "Geom.errorbar",
    "category": "section",
    "text": "Draw vertical and/or horizontal error bars."
},

{
    "location": "lib/geoms/geom_errorbar.html#Aesthetics-1",
    "page": "Geom.errorbar",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-position of the bar.\nymin: Lower Y-position.\nymax: Upper Y-position.\ny: Y-position of the bar.\nxmin: Left-most X-position\nymax: Right-most X-position.\ncolor (optional): Bar color (categorial or continuous)The x, ymin, ymax and/or y, xmin, xmax aesthetics must be defined. With the later a vertical error bar is drawn, and the former, a horizontal bar."
},

{
    "location": "lib/geoms/geom_errorbar.html#Examples-1",
    "page": "Geom.errorbar",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)\nsrand(1234)using Distributions\n\nsds = [1, 1/2, 1/4, 1/8, 1/16, 1/32]\nn = 10\nys = [mean(rand(Normal(0, sd), n)) for sd in sds]\nymins = ys .- (1.96 * sds / sqrt(n))\nymaxs = ys .+ (1.96 * sds / sqrt(n))\n\nplot(x=1:length(sds), y=ys, ymin=ymins, ymax=ymaxs,\n     Geom.point, Geom.errorbar)"
},

{
    "location": "lib/geoms/geom_hexbin.html#",
    "page": "Geom.hexbin",
    "title": "Geom.hexbin",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_hexbin.html#Geom.hexbin-1",
    "page": "Geom.hexbin",
    "title": "Geom.hexbin",
    "category": "section",
    "text": "Bin data into tiled hexagonal bins and color by count."
},

{
    "location": "lib/geoms/geom_hexbin.html#Aesthetics-1",
    "page": "Geom.hexbin",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Observations to be binned and plotted on the x-axis.\ny: Observations to be binned and plotted on the y-axis.\nxsize\nysizeBy default Stat.hexbin is applied which bins x and y observations and colors hexagons according to count. To override this, pass Stat.identity to plot and manually bind the color aesthetic."
},

{
    "location": "lib/geoms/geom_hexbin.html#Arguments-1",
    "page": "Geom.hexbin",
    "title": "Arguments",
    "category": "section",
    "text": "xbincount: Number of bins along the x-axis.\nybincount: Number of bins along the y-axis."
},

{
    "location": "lib/geoms/geom_hexbin.html#Examples-1",
    "page": "Geom.hexbin",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly, Distributions\nGadfly.set_default_plot_size(14cm, 8cm)X = rand(MultivariateNormal([0.0, 0.0], [1.0 0.5; 0.5 1.0]), 10000);\nplot(x=X[1,:], y=X[2,:], Geom.hexbin)plot(x=X[1,:], y=X[2,:], Geom.hexbin(xbincount=100, ybincount=100))"
},

{
    "location": "lib/geoms/geom_histogram2d.html#",
    "page": "Geom.histogram2d",
    "title": "Geom.histogram2d",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_histogram2d.html#Geom.histogram2d-1",
    "page": "Geom.histogram2d",
    "title": "Geom.histogram2d",
    "category": "section",
    "text": "Bin data in rectangles and indicate density with color. As in heatmaps, etc.An alias for Geom.rectbin with Stat.histogram2d."
},

{
    "location": "lib/geoms/geom_histogram2d.html#Aesthetics-1",
    "page": "Geom.histogram2d",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Observations to be binned and plotted on the x coordinate.\ny: Observations to binned and plotted on the y coordinate."
},

{
    "location": "lib/geoms/geom_histogram2d.html#Arguments-1",
    "page": "Geom.histogram2d",
    "title": "Arguments",
    "category": "section",
    "text": "xbincount: Fix the number of bins in the x coordinate.\nxminbincount: Set the minimum x coordinate bincount when automatically determining the number of bins.\nxmaxbincount: Set the maximum x coordinate bincount when automatically determining the number of bins.\nybincount: Fix the number of bins in the y coordinate.\nyminbincount: Set the minimum y coordinate bincount when automatically determining the number of bins.\nymaxbincount: Set the maximum y coordinate bincount when automatically determining the number of bin."
},

{
    "location": "lib/geoms/geom_histogram2d.html#Examples-1",
    "page": "Geom.histogram2d",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"car\", \"Womenlf\"), x=\"HIncome\", y=\"Region\", Geom.histogram2d)plot(dataset(\"car\", \"UN\"), x=\"GDP\", y=\"InfantMortality\",\n     Scale.x_log10, Scale.y_log10, Geom.histogram2d)# Explicitly setting the number of bins\nplot(dataset(\"car\", \"UN\"), x=\"GDP\", y=\"InfantMortality\",\n     Scale.x_log10, Scale.y_log10, Geom.histogram2d(xbincount=30, ybincount=30))"
},

{
    "location": "lib/geoms/geom_histogram.html#",
    "page": "Geom.histogram",
    "title": "Geom.histogram",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_histogram.html#Geom.histogram-1",
    "page": "Geom.histogram",
    "title": "Geom.histogram",
    "category": "section",
    "text": "Draw histograms. An alias for Geom.bar with Stat.histogram."
},

{
    "location": "lib/geoms/geom_histogram.html#Aesthetics-1",
    "page": "Geom.histogram",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Sample to draw histogram from.\ncolor (optional): Group categoricially by color."
},

{
    "location": "lib/geoms/geom_histogram.html#Arguments-1",
    "page": "Geom.histogram",
    "title": "Arguments",
    "category": "section",
    "text": "position: Either :stack or :dodge. If the color aesthetic is bound this determines how bars of different colors should be arranged: stacked on top of each other, or placed side by side.\norientation: Either :vertical (default) or :horizontal. If :horizontal, then the required aesthetic is y instead of x.\nbincount: Number of bins to use. If unspecified, an optimization method is used to determine a reasonable value.\nminbincount: Set a lower limit when automatically choosing a bin count.\nmaxbincount: Set an upper limit when automatically choosing a bin count.\ndensity: If true, use density rather that counts."
},

{
    "location": "lib/geoms/geom_histogram.html#Examples-1",
    "page": "Geom.histogram",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.histogram)# Binding categorical data to color\nplot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\", Geom.histogram)# Choosing a smaller bin count\nplot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\",\n     Geom.histogram(bincount=30))# Density instead of counts\nplot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", color=\"Cut\",\n     Geom.histogram(bincount=30, density=true))"
},

{
    "location": "lib/geoms/geom_hline.html#",
    "page": "Geom.hline",
    "title": "Geom.hline",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_hline.html#Geom.hline-1",
    "page": "Geom.hline",
    "title": "Geom.hline",
    "category": "section",
    "text": "Draw horizontal lines across the plot canvas."
},

{
    "location": "lib/geoms/geom_hline.html#Aesthetics-1",
    "page": "Geom.hline",
    "title": "Aesthetics",
    "category": "section",
    "text": "yintercept: Y-axis intercept"
},

{
    "location": "lib/geoms/geom_hline.html#Arguments-1",
    "page": "Geom.hline",
    "title": "Arguments",
    "category": "section",
    "text": "color: Color of the lines.\nsize: Width of the lines.\nstyle: Style of the lines."
},

{
    "location": "lib/geoms/geom_hline.html#Examples-1",
    "page": "Geom.hline",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n   yintercept=[2.5, 4.0], Geom.point, Geom.hline(style=:dot))# Colors and widths of lines can be changed. This works separately from the\n# `color` and `size` aesthetics.  They may be either a scalor or a vector of\n# length(yintercept).\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n   yintercept=[2.5, 4.0], Geom.point,\n   Geom.hline(color=[\"orange\",\"red\"], size=[2mm,3mm]))"
},

{
    "location": "lib/geoms/geom_label.html#",
    "page": "Geom.label",
    "title": "Geom.label",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_label.html#Geom.label-1",
    "page": "Geom.label",
    "title": "Geom.label",
    "category": "section",
    "text": "Label positions on the plot frame.This geometry attemps to optimize label positioning so that labels do not overlap, and hides any that would overlap."
},

{
    "location": "lib/geoms/geom_label.html#Aesthetics-1",
    "page": "Geom.label",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position.\ny: Y-axis position.\nlabel: Text to render."
},

{
    "location": "lib/geoms/geom_label.html#Arguments-1",
    "page": "Geom.label",
    "title": "Arguments",
    "category": "section",
    "text": "position: One of :dynamic, :left, :right, :above, :below, :centered. If :dynamic is used, label positions will be adjusted to avoid overaps. Otherwise, labels will be statically positioned left, right, above, below, or centered relative to the point.\nhide_overlaps: If true, and dynamic positioning is used, labels that would otherwise overlap another label or be drawn outside the plot panel are hidden. (default: true)"
},

{
    "location": "lib/geoms/geom_label.html#Examples-1",
    "page": "Geom.label",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 10cm)plot(dataset(\"ggplot2\", \"mpg\"), x=\"Cty\", y=\"Hwy\", label=\"Model\", Geom.point, Geom.label)plot(dataset(\"MASS\", \"mammals\"), x=\"Body\", y=\"Brain\", label=1,\n     Scale.x_log10, Scale.y_log10, Geom.point, Geom.label)plot(dataset(\"MASS\", \"mammals\"), x=\"Body\", y=\"Brain\", label=1,\n     Scale.x_log10, Scale.y_log10, Geom.label(position=:centered))"
},

{
    "location": "lib/geoms/geom_line.html#",
    "page": "Geom.line",
    "title": "Geom.line",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_line.html#Geom.line-1",
    "page": "Geom.line",
    "title": "Geom.line",
    "category": "section",
    "text": ""
},

{
    "location": "lib/geoms/geom_line.html#Aesthetics-1",
    "page": "Geom.line",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position.\ny: Y-axis position.\ngroup (optional): Group categorically.\ncolor (optional): Group categorically and indicate by color."
},

{
    "location": "lib/geoms/geom_line.html#Arguments-1",
    "page": "Geom.line",
    "title": "Arguments",
    "category": "section",
    "text": "preserve_order: Default behavior for Geom.line is to draw lines between points in order along the x-axis. If this option is true, lines will be drawn between points in the order they appear in the data. Geom.path() is Geom.line(preserve_order=true)."
},

{
    "location": "lib/geoms/geom_line.html#Examples-1",
    "page": "Geom.line",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"lattice\", \"melanoma\"), x=\"Year\", y=\"Incidence\", Geom.line)plot(dataset(\"Zelig\", \"approval\"), x=\"Month\",  y=\"Approve\", color=\"Year\", Geom.line)"
},

{
    "location": "lib/geoms/geom_path.html#",
    "page": "Geom.path",
    "title": "Geom.path",
    "category": "page",
    "text": "Author = \"David Chudzicki\""
},

{
    "location": "lib/geoms/geom_path.html#Geom.path-1",
    "page": "Geom.path",
    "title": "Geom.path",
    "category": "section",
    "text": "Draw lines between points in the order they appear in the data. This is an alias for Geom.line with preserve_order=true."
},

{
    "location": "lib/geoms/geom_path.html#Aesthetics-1",
    "page": "Geom.path",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position.\ny: Y-axis position.\ncolor (optional): Group categorically by color."
},

{
    "location": "lib/geoms/geom_path.html#Examples-1",
    "page": "Geom.path",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)Here's a random walk in 2D:n = 500\nsrand(1234)\nxjumps = rand(n)-.5\nyjumps = rand(n)-.5\nplot(x=cumsum(xjumps),y=cumsum(yjumps),Geom.path())Here's a spiral:t = 0:0.2:8pi\nplot(x=t.*cos(t), y=t.*sin(t), Geom.path)"
},

{
    "location": "lib/geoms/geom_point.html#",
    "page": "Geom.point",
    "title": "Geom.point",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_point.html#Geom.point-1",
    "page": "Geom.point",
    "title": "Geom.point",
    "category": "section",
    "text": "The point geometry is used to draw various types of scatterplots."
},

{
    "location": "lib/geoms/geom_point.html#Aesthetics-1",
    "page": "Geom.point",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position.\ny: Y-axis position.\ncolor (optional): Point color (categorial or continuous)."
},

{
    "location": "lib/geoms/geom_point.html#Examples-1",
    "page": "Geom.point",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\", Geom.point)# Binding categorial data to the color aesthetic\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n     color=\"Species\", Geom.point)# Binding continuous data to the color aesthetic\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n     color=\"PetalLength\", Geom.point)# Binding categorial data to x\nplot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.point)# Binding categorical data to the shape aesthetic\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\", shape=\"Species\", color=\"Species\", Geom.point)<!– TODO: size aesthetic –>"
},

{
    "location": "lib/geoms/geom_polygon.html#",
    "page": "Geom.polygon",
    "title": "Geom.polygon",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_polygon.html#Geom.polygon-1",
    "page": "Geom.polygon",
    "title": "Geom.polygon",
    "category": "section",
    "text": "Draw polygons."
},

{
    "location": "lib/geoms/geom_polygon.html#Aesthetics-1",
    "page": "Geom.polygon",
    "title": "Aesthetics",
    "category": "section",
    "text": "Aesthetics used directly:x: X-axis position.\ny: Y-axis position.\ngroup (optional): Group categorically.\ncolor (optional): Group categorically and indicate by color."
},

{
    "location": "lib/geoms/geom_polygon.html#Arguments-1",
    "page": "Geom.polygon",
    "title": "Arguments",
    "category": "section",
    "text": "order: Z-order relative to other geometry.\nfill: If true, fill the polygon and stroke according to Theme.discrete_highlight_color. If false (default), only stroke.\npreserve_order: If true, connect points in the order they are given. If false (default) order the points around their centroid."
},

{
    "location": "lib/geoms/geom_polygon.html#Examples-1",
    "page": "Geom.polygon",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(x=[0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0, 4, 5, 5, 4],\n     y=[0, 0, 1, 1, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 3, 3],\n     group=[\"H\", \"H\", \"H\", \"H\", \"H\", \"H\", \"H\", \"H\",\n            \"H\", \"H\", \"H\", \"H\", \"I\", \"I\", \"I\", \"I\"],\n     Geom.polygon(preserve_order=true, fill=true))"
},

{
    "location": "lib/geoms/geom_rectbin.html#",
    "page": "Geom.rectbin",
    "title": "Geom.rectbin",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_rectbin.html#Geom.rectbin-1",
    "page": "Geom.rectbin",
    "title": "Geom.rectbin",
    "category": "section",
    "text": "Draw colored rectangles."
},

{
    "location": "lib/geoms/geom_rectbin.html#Aesthetics-1",
    "page": "Geom.rectbin",
    "title": "Aesthetics",
    "category": "section",
    "text": "colorEitherx_min\nx_max\ny_min\ny_maxOrx\nyIn the former case, rectangles defined by x_min, x_max, y_min, y_max are drawn, in the latter, equal sizes squares are centered at x and y positions."
},

{
    "location": "lib/geoms/geom_rectbin.html#Examples-1",
    "page": "Geom.rectbin",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"Zelig\", \"macro\"), x=\"Year\", y=\"Country\", color=\"GDP\", Geom.rectbin)"
},

{
    "location": "lib/geoms/geom_ribbon.html#",
    "page": "Geom.ribbon",
    "title": "Geom.ribbon",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_ribbon.html#Geom.ribbon-1",
    "page": "Geom.ribbon",
    "title": "Geom.ribbon",
    "category": "section",
    "text": "Draw a ribbon bounded above and below by ymin and ymax, respectively."
},

{
    "location": "lib/geoms/geom_ribbon.html#Aesthetics-1",
    "page": "Geom.ribbon",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X-axis position\nymin: Y-axis lower bound.\nymax: Y-axis upper bound.\ncolor (optional): Group categorically by color."
},

{
    "location": "lib/geoms/geom_ribbon.html#Examples-1",
    "page": "Geom.ribbon",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nusing DataFrames\nGadfly.set_default_plot_size(14cm, 8cm)xs = 0:0.1:20\n\ndf_cos = DataFrame(\n    x=xs,\n    y=cos(xs),\n    ymin=cos(xs) .- 0.5,\n    ymax=cos(xs) .+ 0.5,\n    f=\"cos\"\n)\n\ndf_sin = DataFrame(\n    x=xs,\n    y=sin(xs),\n    ymin=sin(xs) .- 0.5,\n    ymax=sin(xs) .+ 0.5,\n    f=\"sin\"\n)\n\ndf = vcat(df_cos, df_sin)\np = plot(df, x=:x, y=:y, ymin=:ymin, ymax=:ymax, color=:f, Geom.line, Geom.ribbon)"
},

{
    "location": "lib/geoms/geom_segment.html#",
    "page": "Geom.segment",
    "title": "Geom.segment",
    "category": "page",
    "text": "Author = \"Mattriks\""
},

{
    "location": "lib/geoms/geom_segment.html#Geom.segment-1",
    "page": "Geom.segment",
    "title": "Geom.segment",
    "category": "section",
    "text": "Draw separate line segments/vectors/arrows.note: Note\nIf you want arrows, then you need to provide a Scale object for both axes. See example below."
},

{
    "location": "lib/geoms/geom_segment.html#Aesthetics-1",
    "page": "Geom.segment",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Start of line segment.\ny: Start of line segment.\nxend: End of line segment.\nyend: End of line segment.\ncolor (optional): Color of line segments."
},

{
    "location": "lib/geoms/geom_segment.html#Arguments-1",
    "page": "Geom.segment",
    "title": "Arguments",
    "category": "section",
    "text": "arrow: Default behavior for Geom.segment is to draw line segments without arrows. Geom.vector is Geom.segment(arrow=true)."
},

{
    "location": "lib/geoms/geom_segment.html#Examples-1",
    "page": "Geom.segment",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 14cm)seals = RDatasets.dataset(\"ggplot2\",\"seals\")\nseals[:Latb] = seals[:Lat] + seals[:DeltaLat]\nseals[:Longb] = seals[:Long] + seals[:DeltaLong]\nseals[:Angle] = atan2(seals[:DeltaLat], seals[:DeltaLong])\n\ncoord = Coord.cartesian(xmin=-175.0, xmax=-119, ymin=29, ymax=50)\n# Geom.vector also needs scales for both axes:\nxsc  = Scale.x_continuous(minvalue=-175.0, maxvalue=-119)\nysc  = Scale.y_continuous(minvalue=29, maxvalue=50)\ncolsc = Scale.color_continuous(minvalue=-3, maxvalue=3)\n\nlayer1 = layer(seals, x=:Long, y=:Lat, xend=:Longb, yend=:Latb, Geom.vector, color=:Angle)\n\nplot(layer1, xsc, ysc, colsc, coord)"
},

{
    "location": "lib/geoms/geom_smooth.html#",
    "page": "Geom.smooth",
    "title": "Geom.smooth",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_smooth.html#Geom.smooth-1",
    "page": "Geom.smooth",
    "title": "Geom.smooth",
    "category": "section",
    "text": "Plot a smooth function estimated from data. An alias for Geom.line with Stat.smooth."
},

{
    "location": "lib/geoms/geom_smooth.html#Aesthetics-1",
    "page": "Geom.smooth",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Predictor data.\ny: Response data.\ncolor: (optional) Group categorically by color."
},

{
    "location": "lib/geoms/geom_smooth.html#Arguments-1",
    "page": "Geom.smooth",
    "title": "Arguments",
    "category": "section",
    "text": "method: :loess and :lm are supported.\nsmoothing: Method specific parameter controlling the degree of smoothing. For loess, this is the span parameter giving the proportion of data used for each local fit where 0.75 is the default. Smaller values use more data (less local context), larger values use less data (more local context)."
},

{
    "location": "lib/geoms/geom_smooth.html#Examples-1",
    "page": "Geom.smooth",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)x_data = 0.0:0.1:2.0\ny_data = x_data.^2 + rand(length(x_data))\nplot(x=x_data, y=y_data, Geom.point, Geom.smooth(method=:loess,smoothing=0.9))plot(x=x_data, y=y_data, Geom.point, Geom.smooth(method=:loess,smoothing=0.2))"
},

{
    "location": "lib/geoms/geom_step.html#",
    "page": "Geom.step",
    "title": "Geom.step",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_step.html#Geom.step-1",
    "page": "Geom.step",
    "title": "Geom.step",
    "category": "section",
    "text": "Connect points using a stepwise function. Equivalent to Geom.line with Stat.step."
},

{
    "location": "lib/geoms/geom_step.html#Aesthetics-1",
    "page": "Geom.step",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Point x-coordinate.\ny: Point y-coordinate."
},

{
    "location": "lib/geoms/geom_step.html#Arguments-1",
    "page": "Geom.step",
    "title": "Arguments",
    "category": "section",
    "text": "direction: Either :hv for horizontal then vertical, or :vh for vertical then horizontal."
},

{
    "location": "lib/geoms/geom_step.html#Examples-1",
    "page": "Geom.step",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)\nsrand(1234)plot(x=rand(25), y=rand(25), Geom.step)"
},

{
    "location": "lib/geoms/geom_subplot_grid.html#",
    "page": "Geom.subplot_grid",
    "title": "Geom.subplot_grid",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_subplot_grid.html#Geom.subplot_grid-1",
    "page": "Geom.subplot_grid",
    "title": "Geom.subplot_grid",
    "category": "section",
    "text": "Draw multiple subplots in a grid organized by one or two categorial vectors."
},

{
    "location": "lib/geoms/geom_subplot_grid.html#Aesthetics-1",
    "page": "Geom.subplot_grid",
    "title": "Aesthetics",
    "category": "section",
    "text": "xgroup (optional): Arrange subplots on the X-axis by categorial data.\nygroup (optional): Arrange subplots on the Y-axis by categorial data.\nfree_y_axis (optional): Whether the y-axis scales can differ acrossthe subplots. Defaults to false. If true, scales are set appropriately for individual subplots.free_x_axis (optional): Whether the x-axis scales can differ acrossthe subplots. Defaults to false. If true, scales are set appropriately for individual subplots.One or both of xgroup or ygroup must be bound. If only one, a single column or row of subplots is drawn, if both, a grid."
},

{
    "location": "lib/geoms/geom_subplot_grid.html#Arguments-1",
    "page": "Geom.subplot_grid",
    "title": "Arguments",
    "category": "section",
    "text": "Geom.subplot_grid(elements::Gadfly.ElementOrFunction...)Unlike most geometries, Geom.subplot_grid is typically passed one or more parameters. The constructor works for the most part like the layer function. Arbitrary plot elements may be passed, while aesthetic bindings are inherited from the parent plot."
},

{
    "location": "lib/geoms/geom_subplot_grid.html#Examples-1",
    "page": "Geom.subplot_grid",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)set_default_plot_size(20cm, 7.5cm)\nplot(dataset(\"datasets\", \"OrchardSprays\"),\n     xgroup=\"Treatment\", x=\"ColPos\", y=\"RowPos\", color=\"Decrease\",\n     Geom.subplot_grid(Geom.point))set_default_plot_size(14cm, 25cm)\nplot(dataset(\"vcd\", \"Suicide\"), xgroup=\"Sex\", ygroup=\"Method\", x=\"Age\", y=\"Freq\",\n     Geom.subplot_grid(Geom.bar))"
},

{
    "location": "lib/geoms/geom_subplot_grid.html#Free/fixed-scales:-1",
    "page": "Geom.subplot_grid",
    "title": "Free/fixed scales:",
    "category": "section",
    "text": "using Gadfly # hide\nusing RDatasets # hid\nusing DataFrames\nset_default_plot_size(8cm, 12cm)\n\nwidedf = DataFrame(x = collect(1:10), var1 = collect(1:10), var2 = collect(1:10).^2)\nlongdf = stack(widedf, [:var1, :var2])\nnothing # hideDefault behavior is for the axes' scales to be fixed across the subplots:plot(longdf, ygroup=\"variable\", x=\"x\", y=\"value\", Geom.subplot_grid(Geom.point))We can change this default behavior where appropriate:plot(longdf, ygroup=\"variable\", x=\"x\", y=\"value\", Geom.subplot_grid(Geom.point, free_y_axis=true))"
},

{
    "location": "lib/geoms/geom_vectorfield.html#",
    "page": "Geom.vectorfield",
    "title": "Geom.vectorfield",
    "category": "page",
    "text": "Author = \"Mattriks\""
},

{
    "location": "lib/geoms/geom_vectorfield.html#Geom.vectorfield-1",
    "page": "Geom.vectorfield",
    "title": "Geom.vectorfield",
    "category": "section",
    "text": "Draw a vectorfield of a 2D function or a matrix. A vectorfield consists of gradient vectors calculated for particular points in a space."
},

{
    "location": "lib/geoms/geom_vectorfield.html#Aesthetics-1",
    "page": "Geom.vectorfield",
    "title": "Aesthetics",
    "category": "section",
    "text": "z: 2D function or a matrix that represent \"heights\" relative to to the x-y plane.\nx (optional): Vector of X-coordinates.  If z is a matrix, then the length of x must be equal to the number of rows in z.\ny (optional): Vector of Y-coordinates.  If z is a matrix, then the length of y must be equal to the number of columns in z."
},

{
    "location": "lib/geoms/geom_vectorfield.html#Arguments-1",
    "page": "Geom.vectorfield",
    "title": "Arguments",
    "category": "section",
    "text": "smoothness (optional): Sets the smoothness of the vectorfield, defaults to 1.0. Smaller values (→0) result in more local smoothing. Larger values (→∞) will approach a plane of best fit.\nscale (optional): Sets the size of vectors, defaults to 1.0. \nsamples (optional): Sets the size of the grid at which to estimate vectors, defaults to 20 (i.e. grid is 20 x 20). See the first example below."
},

{
    "location": "lib/geoms/geom_vectorfield.html#Examples-1",
    "page": "Geom.vectorfield",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)coord = Coord.cartesian(xmin=-2, xmax=2, ymin=-2, ymax=2)\nplot(coord, z=(x,y)->x*exp(-(x^2+y^2)), \n        xmin=[-2], xmax=[2], ymin=[-2], ymax=[2], \n# or:     x=-2:0.25:2.0, y=-2:0.25:2.0,     \n        Geom.vectorfield(scale=0.4, samples=17), Geom.contour(levels=6),\n        Scale.x_continuous(minvalue=-2.0, maxvalue=2.0),\n        Scale.y_continuous(minvalue=-2.0, maxvalue=2.0),\n        Guide.xlabel(\"x\"), Guide.ylabel(\"y\"), Guide.colorkey(\"z\")\n    )volcano = Matrix{Float64}(dataset(\"datasets\", \"volcano\"))\nvolc = volcano[1:4:end, 1:4:end] \ncoord = Coord.cartesian(xmin=1, xmax=22, ymin=1, ymax=16)\nplot(coord, z=volc, x=1.0:22, y=1.0:16,\n        Geom.vectorfield(scale=0.05), Geom.contour(levels=7),\n        Scale.x_continuous(minvalue=1.0, maxvalue=22.0),\n        Scale.y_continuous(minvalue=1.0, maxvalue=16.0),\n        Guide.xlabel(\"x\"), Guide.ylabel(\"y\"),\n        Theme(key_position=:none)\n    )"
},

{
    "location": "lib/geoms/geom_violin.html#",
    "page": "Geom.violin",
    "title": "Geom.violin",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_violin.html#Geom.violin-1",
    "page": "Geom.violin",
    "title": "Geom.violin",
    "category": "section",
    "text": "Draw violin plots."
},

{
    "location": "lib/geoms/geom_violin.html#Aesthetics-1",
    "page": "Geom.violin",
    "title": "Aesthetics",
    "category": "section",
    "text": "Aesthetics used directly:x: Group categorically on the X-axis\ny: Y-axis position.\nwidth: Density at a given y value.With the default statistic Stat.violin, only the following need be defined:x (optional): Group categorically on the X-axis.\ny: Sample from which to draw the density plot."
},

{
    "location": "lib/geoms/geom_violin.html#Examples-1",
    "page": "Geom.violin",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"lattice\", \"singer\"), x=\"VoicePart\", y=\"Height\", Geom.violin)"
},

{
    "location": "lib/geoms/geom_vline.html#",
    "page": "Geom.vline",
    "title": "Geom.vline",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/geoms/geom_vline.html#Geom.vline-1",
    "page": "Geom.vline",
    "title": "Geom.vline",
    "category": "section",
    "text": "Draw vertical lines across the plot canvas."
},

{
    "location": "lib/geoms/geom_vline.html#Aesthetics-1",
    "page": "Geom.vline",
    "title": "Aesthetics",
    "category": "section",
    "text": "xintercept: X-axis intercept"
},

{
    "location": "lib/geoms/geom_vline.html#Arguments-1",
    "page": "Geom.vline",
    "title": "Arguments",
    "category": "section",
    "text": "color: Color of the lines.\nsize: Width of the lines.\nstyle: Style of the lines."
},

{
    "location": "lib/geoms/geom_vline.html#Examples-1",
    "page": "Geom.vline",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n   xintercept=[5.0, 7.0], Geom.point, Geom.vline(style=[:solid,[1mm,1mm]]))# Colors and widths of lines can be changed. This works separately from the\n# `color` and `size` aesthetics.  They may be either a scalar or a vector of\n# length(xintercept).\nplot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\",\n   xintercept=[5.0, 7.0], Geom.point,\n   Geom.vline(color=[\"orange\",\"red\"], size=[2mm,3mm]))"
},

{
    "location": "lib/guides.html#",
    "page": "Guides",
    "title": "Guides",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides.html#Guides-1",
    "page": "Guides",
    "title": "Guides",
    "category": "section",
    "text": "Very similar to Geometries are guides, which draw graphics supporting the actual visualization, such as axis ticks and labels and color keys. The major distinction is that geometries always draw within the rectangular plot frame, while guides have some special layout considerations."
},

{
    "location": "lib/guides.html#Available-Guides-1",
    "page": "Guides",
    "title": "Available Guides",
    "category": "section",
    "text": "Pages = map(file -> joinpath(\"guides\", file), readdir(\"guides\"))\nDepth = 1"
},

{
    "location": "lib/guides/guide_annotation.html#",
    "page": "Guide.annotation",
    "title": "Guide.annotation",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides/guide_annotation.html#Guide.annotation-1",
    "page": "Guide.annotation",
    "title": "Guide.annotation",
    "category": "section",
    "text": "Overlay a plot with an arbitrary Compose graphic. The context will inherit the plot's coordinate system, unless overridden with a custom unit box."
},

{
    "location": "lib/guides/guide_annotation.html#Arguments-1",
    "page": "Guide.annotation",
    "title": "Arguments",
    "category": "section",
    "text": "ctx: A Compose Context."
},

{
    "location": "lib/guides/guide_annotation.html#Examples-1",
    "page": "Guide.annotation",
    "title": "Examples",
    "category": "section",
    "text": "using Compose\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(sin, 0, 2pi,\n     Guide.annotation(\n       compose(context(), circle([pi/2, 3*pi/2], [1.0, -1.0], [2mm]), fill(nothing),\n       stroke(colorant\"orange\"))))\n"
},

{
    "location": "lib/guides/guide_colorkey.html#",
    "page": "Guide.colorkey",
    "title": "Guide.colorkey",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides/guide_colorkey.html#Guide.colorkey-1",
    "page": "Guide.colorkey",
    "title": "Guide.colorkey",
    "category": "section",
    "text": "Set the title for the plot legend"
},

{
    "location": "lib/guides/guide_colorkey.html#Arguments-1",
    "page": "Guide.colorkey",
    "title": "Arguments",
    "category": "section",
    "text": "title: Legend title"
},

{
    "location": "lib/guides/guide_colorkey.html#Examples-1",
    "page": "Guide.colorkey",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)volcano = float(convert(Array, dataset(\"datasets\", \"volcano\")))\nplot(z=volcano, Geom.contour, Guide.colorkey(\"Elevation\"))"
},

{
    "location": "lib/guides/guide_manual_color_key.html#",
    "page": "Guide.manual_color_key",
    "title": "Guide.manual_color_key",
    "category": "page",
    "text": "Author = \"Alex Ryckman Mellnik\""
},

{
    "location": "lib/guides/guide_manual_color_key.html#Guide.manual_color_key-1",
    "page": "Guide.manual_color_key",
    "title": "Guide.manual_color_key",
    "category": "section",
    "text": "Manually define a color key"
},

{
    "location": "lib/guides/guide_manual_color_key.html#Arguments-1",
    "page": "Guide.manual_color_key",
    "title": "Arguments",
    "category": "section",
    "text": "title: Legend title\nlabels: Item labels\ncolors: Item colors"
},

{
    "location": "lib/guides/guide_manual_color_key.html#Examples-1",
    "page": "Guide.manual_color_key",
    "title": "Examples",
    "category": "section",
    "text": "Combine two layers into a plot, and set a custom color of one layer.  Add a manual color key with labels that match the two layers.  (Note that \"deepskyblue\" is the default color for Geom.line and others.)using DataFrames\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)points = DataFrame(index=rand(0:10,30), val=rand(1:10,30))\nline = DataFrame(val=rand(1:10,11), index = collect(0:10))\npointLayer = layer(points, x=\"index\", y=\"val\", Geom.point,Theme(default_color=colorant\"green\"))\nlineLayer = layer(line, x=\"index\", y=\"val\", Geom.line)\nplot(pointLayer, lineLayer, Guide.manual_color_key(\"Legend\", [\"Points\", \"Line\"], [\"green\", \"deepskyblue\"]))"
},

{
    "location": "lib/guides/guide_title.html#",
    "page": "Guide.title",
    "title": "Guide.title",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/guides/guide_title.html#Guide.title-1",
    "page": "Guide.title",
    "title": "Guide.title",
    "category": "section",
    "text": "Set the plot tile"
},

{
    "location": "lib/guides/guide_title.html#Arguments-1",
    "page": "Guide.title",
    "title": "Arguments",
    "category": "section",
    "text": "title: Plot title"
},

{
    "location": "lib/guides/guide_title.html#Examples-1",
    "page": "Guide.title",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(dataset(\"ggplot2\", \"diamonds\"), x=\"Price\", Geom.histogram, Guide.title(\"Diamond Price Distribution\"))"
},

{
    "location": "lib/guides/guide_xlabel.html#",
    "page": "Guide.xlabel",
    "title": "Guide.xlabel",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/guides/guide_xlabel.html#Guide.xlabel-1",
    "page": "Guide.xlabel",
    "title": "Guide.xlabel",
    "category": "section",
    "text": "Sets the x-axis label for the plot."
},

{
    "location": "lib/guides/guide_xlabel.html#Arguments-1",
    "page": "Guide.xlabel",
    "title": "Arguments",
    "category": "section",
    "text": "label: X-axis label\norientation (optional): :horizontal, :vertical, or :auto (default)label is not a keyword parameter, it must be supplied as the first argument of Guide.xlabel.  Setting it to nothing will suppress the default label."
},

{
    "location": "lib/guides/guide_xlabel.html#Examples-1",
    "page": "Guide.xlabel",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(cos, 0, 2π, Guide.xlabel(\"Angle\"))plot(cos, 0, 2π, Guide.xlabel(\"Angle\", orientation=:vertical))plot(cos, 0, 2π, Guide.xlabel(nothing))"
},

{
    "location": "lib/guides/guide_xrug.html#",
    "page": "Guide.xrug",
    "title": "Guide.xrug",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides/guide_xrug.html#Guide.xrug-1",
    "page": "Guide.xrug",
    "title": "Guide.xrug",
    "category": "section",
    "text": "Draw a rug plot along the x-axis of a plot."
},

{
    "location": "lib/guides/guide_xrug.html#Aesthetics-1",
    "page": "Guide.xrug",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: X positions of notches."
},

{
    "location": "lib/guides/guide_xrug.html#Examples-1",
    "page": "Guide.xrug",
    "title": "Examples",
    "category": "section",
    "text": "using Compose\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(x=rand(20), y=rand(20), Guide.xrug)"
},

{
    "location": "lib/guides/guide_xticks.html#",
    "page": "Guide.xticks",
    "title": "Guide.xticks",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/guides/guide_xticks.html#Guide.xticks-1",
    "page": "Guide.xticks",
    "title": "Guide.xticks",
    "category": "section",
    "text": "Formats the tick marks and labels for the x-axis"
},

{
    "location": "lib/guides/guide_xticks.html#Arguments-1",
    "page": "Guide.xticks",
    "title": "Arguments",
    "category": "section",
    "text": "ticks: Array of tick locations on the x-axis, :auto to automatically select ticks, or nothing to supress x-axis ticks.\nlabel: Determines if the ticks are labeled, either true (default) or false\norientation: Label orientation (:horizontal, :vertical, :auto). Defaults to :auto"
},

{
    "location": "lib/guides/guide_xticks.html#Examples-1",
    "page": "Guide.xticks",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)ticks = [0.1, 0.3, 0.5]\nplot(x=rand(10), y=rand(10), Geom.line, Guide.xticks(ticks=ticks))plot(x=rand(10), y=rand(10), Geom.line, Guide.xticks(ticks=ticks, label=false))plot(x=rand(10), y=rand(10), Geom.line, Guide.xticks(ticks=ticks, orientation=:vertical))Range types can also be usedplot(x=rand(1:10, 10), y=rand(1:10, 10), Geom.line, Guide.xticks(ticks=[1:9;]))note: Note\nThe ; in ticks=[1:9;] is required to flatten the 1:9 range type into [1, 2, 3, ...]. Alternatively, collect can be used in the following manner ticks=collect(1:9)."
},

{
    "location": "lib/guides/guide_ylabel.html#",
    "page": "Guide.ylabel",
    "title": "Guide.ylabel",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/guides/guide_ylabel.html#Guide.ylabel-1",
    "page": "Guide.ylabel",
    "title": "Guide.ylabel",
    "category": "section",
    "text": "Sets the y-axis label for the plot."
},

{
    "location": "lib/guides/guide_ylabel.html#Arguments-1",
    "page": "Guide.ylabel",
    "title": "Arguments",
    "category": "section",
    "text": "label: Y-axis label\norientation (optional): :horizontal, :vertical, or :auto (default)label is not a keyword parameter, it must be supplied as the first argument of Guide.ylabel.  Setting it to nothing will suppress the default label."
},

{
    "location": "lib/guides/guide_ylabel.html#Examples-1",
    "page": "Guide.ylabel",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(cos, 0, 2π, Guide.ylabel(\"cos(x)\"))plot(cos, 0, 2π, Guide.ylabel(\"cos(x)\", orientation=:horizontal))plot(cos, 0, 2π, Guide.ylabel(nothing))"
},

{
    "location": "lib/guides/guide_yrug.html#",
    "page": "Guide.yrug",
    "title": "Guide.yrug",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/guides/guide_yrug.html#Guide.yrug-1",
    "page": "Guide.yrug",
    "title": "Guide.yrug",
    "category": "section",
    "text": "Draw a rug plot along the y-axis of a plot."
},

{
    "location": "lib/guides/guide_yrug.html#Aesthetics-1",
    "page": "Guide.yrug",
    "title": "Aesthetics",
    "category": "section",
    "text": "y: Y positions of notches."
},

{
    "location": "lib/guides/guide_yrug.html#Examples-1",
    "page": "Guide.yrug",
    "title": "Examples",
    "category": "section",
    "text": "using Compose\nusing Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)plot(x=rand(20), y=rand(20), Guide.yrug)"
},

{
    "location": "lib/guides/guide_yticks.html#",
    "page": "Guide.yticks",
    "title": "Guide.yticks",
    "category": "page",
    "text": "Author = \"Darwin Darakananda\""
},

{
    "location": "lib/guides/guide_yticks.html#Guide.yticks-1",
    "page": "Guide.yticks",
    "title": "Guide.yticks",
    "category": "section",
    "text": "Formats the tick marks and labels for the y-axis"
},

{
    "location": "lib/guides/guide_yticks.html#Arguments-1",
    "page": "Guide.yticks",
    "title": "Arguments",
    "category": "section",
    "text": "ticks: Array of tick locations on the y-axis, :auto to automatically select ticks, or nothing to supress y-axis ticks.\nlabel: Determines if the ticks are labeled, either true (default) or false\norientation: Label orientation (:horizontal, :vertical, :auto). Defaults to :auto"
},

{
    "location": "lib/guides/guide_yticks.html#Examples-1",
    "page": "Guide.yticks",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(14cm, 8cm)ticks = [0.2, 0.4, 0.6]\nplot(x=rand(10), y=rand(10), Geom.line, Guide.yticks(ticks=ticks))plot(x=rand(10), y=rand(10), Geom.line, Guide.yticks(ticks=ticks, label=false))plot(x=rand(10), y=rand(10), Geom.line, Guide.yticks(ticks=ticks, orientation=:vertical))Range types can also be usedplot(x=rand(1:10, 10), y=rand(1:10, 10), Geom.line, Guide.yticks(ticks=[1:9;]))note: Note\nThe ; in ticks=[1:9;] is required to flatten the 1:9 range type into [1, 2, 3, ...]. Alternatively, collect can be used in the following manner ticks=collect(1:9)."
},

{
    "location": "lib/stats.html#",
    "page": "Statistics",
    "title": "Statistics",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats.html#Statistics-1",
    "page": "Statistics",
    "title": "Statistics",
    "category": "section",
    "text": "Statistics are functions taking as input one or more aesthetics, operating on those values, then output to one or more aesthetics. For example, drawing of boxplots typically uses the boxplot statistic (Stat.boxplot) that takes as input the x and y aesthetic, and outputs the middle, and upper and lower hinge, and upper and lower fence aesthetics."
},

{
    "location": "lib/stats.html#Available-Statistics-1",
    "page": "Statistics",
    "title": "Available Statistics",
    "category": "section",
    "text": "Pages = map(file -> joinpath(\"stats\", file), readdir(\"stats\"))\nDepth = 1"
},

{
    "location": "lib/stats/stat_binmean.html#",
    "page": "Stat.binmean",
    "title": "Stat.binmean",
    "category": "page",
    "text": "Author = \"Matthieu Gomez\""
},

{
    "location": "lib/stats/stat_binmean.html#Stat.binmean-1",
    "page": "Stat.binmean",
    "title": "Stat.binmean",
    "category": "section",
    "text": "Plot the mean of y against the mean of x within n quantile bins of x."
},

{
    "location": "lib/stats/stat_binmean.html#Aesthetics-1",
    "page": "Stat.binmean",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Data to be plotted on the x-axis.\ny: Data to be plotted on the y-axis."
},

{
    "location": "lib/stats/stat_binmean.html#Arguments-1",
    "page": "Stat.binmean",
    "title": "Arguments",
    "category": "section",
    "text": "n: Number of bins"
},

{
    "location": "lib/stats/stat_binmean.html#Examples-1",
    "page": "Stat.binmean",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)p1 = plot(dataset(\"datasets\", \"iris\"), x=\"SepalLength\", y=\"SepalWidth\", Stat.binmean, Geom.point)"
},

{
    "location": "lib/stats/stat_qq.html#",
    "page": "Stat.qq",
    "title": "Stat.qq",
    "category": "page",
    "text": "Author = \"Dave Kleinschmidt\""
},

{
    "location": "lib/stats/stat_qq.html#Stat.qq-1",
    "page": "Stat.qq",
    "title": "Stat.qq",
    "category": "section",
    "text": "Generates quantile-quantile plots for x and y.  If each is a numeric vector, their sample quantiles will be compared.  If one is a Distribution, then its theoretical quantiles will be compared with the sample quantiles of the other."
},

{
    "location": "lib/stats/stat_qq.html#Aesthetics-1",
    "page": "Stat.qq",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Data or Distribution to be plotted on the x-axis.\ny: Data or Distribution to be plotted on the y-axis."
},

{
    "location": "lib/stats/stat_qq.html#Examples-1",
    "page": "Stat.qq",
    "title": "Examples",
    "category": "section",
    "text": "using Distributions\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)plot(x=rand(Normal(), 100), y=rand(Normal(), 100), Stat.qq, Geom.point)\nplot(x=rand(Normal(), 100), y=Normal(), Stat.qq, Geom.point)"
},

{
    "location": "lib/stats/stat_step.html#",
    "page": "Stat.step",
    "title": "Stat.step",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats/stat_step.html#Stat.step-1",
    "page": "Stat.step",
    "title": "Stat.step",
    "category": "section",
    "text": "Perform stepwise interpolation between points. If x and y define a a series of points, a new point in inserted between each. Between (x[i], y[i]) and (x[i+1], y[i+1]), either (x[i+1], y[i]) or (x[i], y[i+1]) is inserted, depending on the direction argument."
},

{
    "location": "lib/stats/stat_step.html#Aesthetics-1",
    "page": "Stat.step",
    "title": "Aesthetics",
    "category": "section",
    "text": "x: Point x-coordinate.\ny: Point y-coordinate."
},

{
    "location": "lib/stats/stat_step.html#Arguments-1",
    "page": "Stat.step",
    "title": "Arguments",
    "category": "section",
    "text": "direction: Either :hv for horizontal then vertical, or :vh for vertical then horizontal.using Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)plot(x=rand(25), y=rand(25), Stat.step, Geom.line)"
},

{
    "location": "lib/stats/stat_x_jitter.html#",
    "page": "Stat.x_jitter",
    "title": "Stat.x_jitter",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats/stat_x_jitter.html#Stat.x_jitter-1",
    "page": "Stat.x_jitter",
    "title": "Stat.x_jitter",
    "category": "section",
    "text": "Nudge values on the x-axis to avoid overplotting."
},

{
    "location": "lib/stats/stat_x_jitter.html#Asethetics-1",
    "page": "Stat.x_jitter",
    "title": "Asethetics",
    "category": "section",
    "text": "x: Data to nudge."
},

{
    "location": "lib/stats/stat_x_jitter.html#Arguments-1",
    "page": "Stat.x_jitter",
    "title": "Arguments",
    "category": "section",
    "text": "range: Maximum jitter is this number times the resolution of the data, where the \"resolution\" is the smallest non-zero difference between two points.\nseed: Seed for RNG used to randomly jitter values."
},

{
    "location": "lib/stats/stat_x_jitter.html#Examples-1",
    "page": "Stat.x_jitter",
    "title": "Examples",
    "category": "section",
    "text": "using Distributions\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)plot(x=rand(1:4, 500), y=rand(500), Stat.x_jitter(range=0.5), Geom.point)"
},

{
    "location": "lib/stats/stat_xticks.html#",
    "page": "Stat.xticks",
    "title": "Stat.xticks",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats/stat_xticks.html#Stat.xticks-1",
    "page": "Stat.xticks",
    "title": "Stat.xticks",
    "category": "section",
    "text": "Compute an appealing set of ticks that encompass the data."
},

{
    "location": "lib/stats/stat_xticks.html#Arguments-1",
    "page": "Stat.xticks",
    "title": "Arguments",
    "category": "section",
    "text": "ticks: A fixed array of ticks, or nothing to indicate they should be computed.\ngranularity_weight: Importance of having a reasonable number of ticks. (Default: 1/4)\nsimplicity_weight: Importance of including zero. (Default: 1/6)\ncoverage_weight: Importance of tightly fitting the span of the data. (Default: 1/3)\nniceness_weight: Importance of having a nice numbering. (Default: 1/4)"
},

{
    "location": "lib/stats/stat_xticks.html#Aesthetics-1",
    "page": "Stat.xticks",
    "title": "Aesthetics",
    "category": "section",
    "text": "All x-axis aesthetics are considered, and ticks are output to the xtick and xgrid aesthetics."
},

{
    "location": "lib/stats/stat_xticks.html#Examples-1",
    "page": "Stat.xticks",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)# Providing a fixed set of ticks\nplot(x=rand(10), y=rand(10),\n     Stat.xticks(ticks=[0.0, 0.1, 0.9, 1.0]), Geom.point)"
},

{
    "location": "lib/stats/stat_y_jitter.html#",
    "page": "Stat.y_jitter",
    "title": "Stat.y_jitter",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats/stat_y_jitter.html#Stat.y_jitter-1",
    "page": "Stat.y_jitter",
    "title": "Stat.y_jitter",
    "category": "section",
    "text": "Nudge values on the y-axis to avoid overplotting."
},

{
    "location": "lib/stats/stat_y_jitter.html#Asethetics-1",
    "page": "Stat.y_jitter",
    "title": "Asethetics",
    "category": "section",
    "text": "y: Data to nudge."
},

{
    "location": "lib/stats/stat_y_jitter.html#Arguments-1",
    "page": "Stat.y_jitter",
    "title": "Arguments",
    "category": "section",
    "text": "range: Maximum jitter is this number times the resolution of the data, where the \"resolution\" is the smallest non-zero difference between two points.\nseed: Seed for RNG used to randomly jitter values."
},

{
    "location": "lib/stats/stat_y_jitter.html#Examples-1",
    "page": "Stat.y_jitter",
    "title": "Examples",
    "category": "section",
    "text": "using Distributions\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)plot(x=rand(500), y=rand(1:4, 500), Stat.y_jitter(range=0.5), Geom.point)"
},

{
    "location": "lib/stats/stat_yticks.html#",
    "page": "Stat.yticks",
    "title": "Stat.yticks",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/stats/stat_yticks.html#Stat.yticks-1",
    "page": "Stat.yticks",
    "title": "Stat.yticks",
    "category": "section",
    "text": "Compute an appealing set of ticks that encompass the data."
},

{
    "location": "lib/stats/stat_yticks.html#Arguments-1",
    "page": "Stat.yticks",
    "title": "Arguments",
    "category": "section",
    "text": "ticks: A fixed array of ticks, or nothing to indicate they should be computed.\ngranularity_weight: Importance of having a reasonable number of ticks. (Default: 1/4)\nsimplicity_weight: Importance of including zero. (Default: 1/6)\ncoverage_weight: Importance of tightly fitting the span of the data. (Default: 1/3)\nniceness_weight: Importance of having a nice numbering. (Default: 1/4)"
},

{
    "location": "lib/stats/stat_yticks.html#Aesthetics-1",
    "page": "Stat.yticks",
    "title": "Aesthetics",
    "category": "section",
    "text": "All y-axis aesthetics are considered, and ticks are output to the ytick and ygrid aesthetics."
},

{
    "location": "lib/stats/stat_yticks.html#Examples-1",
    "page": "Stat.yticks",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)# Providing a fixed set of ticks\nplot(x=rand(10), y=rand(10),\n     Stat.yticks(ticks=[0.0, 0.1, 0.9, 1.0]), Geom.point)"
},

{
    "location": "lib/coords.html#",
    "page": "Coords",
    "title": "Coords",
    "category": "page",
    "text": "Author = \"Tamas Nagy\""
},

{
    "location": "lib/coords.html#Coordinates-1",
    "page": "Coords",
    "title": "Coordinates",
    "category": "section",
    "text": "Coordinate systems are mappings between a coordinate space and the 2D rendered output."
},

{
    "location": "lib/coords.html#Available-Coordinates-1",
    "page": "Coords",
    "title": "Available Coordinates",
    "category": "section",
    "text": "Pages = map(file -> joinpath(\"coords\", file), readdir(\"coords\"))\nDepth = 1"
},

{
    "location": "lib/coords/coord_cartesian.html#",
    "page": "Coord.cartesian",
    "title": "Coord.cartesian",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/coords/coord_cartesian.html#Coord.cartesian-1",
    "page": "Coord.cartesian",
    "title": "Coord.cartesian",
    "category": "section",
    "text": ""
},

{
    "location": "lib/coords/coord_cartesian.html#Arguments-1",
    "page": "Coord.cartesian",
    "title": "Arguments",
    "category": "section",
    "text": "xmin: Hard minimum value on the x-axis.\nxmax: hard maximum value on the x-axis.\nymin: Hard minimum value on the y-axis.\nymax: Hard maximum value on the y-axis.\nxflip: True if the x-axis should be flipped. (default: false)\nyflip: True if the y-axis should be flipped. (default: false)\naspect_ratio: Aspect ratio, or nothing if no fixed aspect ratio. (default: nothing)\nfixed: True if the ratio should follow the units of the plot. E.g. if the y-axis is 5 units high and the x-axis in 10 units across, the plot will be drawn at an aspect ratio of 2. Overrides aspect_ratio (default: false)"
},

{
    "location": "lib/coords/coord_cartesian.html#Examples-1",
    "page": "Coord.cartesian",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly# Transform both dimensions\nplot(sin, 0, 20, Coord.cartesian(xmin=2π, xmax=4π, ymin=-2, ymax=2))"
},

{
    "location": "lib/scales.html#",
    "page": "Scales",
    "title": "Scales",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales.html#Scales-1",
    "page": "Scales",
    "title": "Scales",
    "category": "section",
    "text": "Scales, similarly to Statistics, apply a transformation to the original data, typically mapping one aesthetic to the same aesthetic, while retaining the original value. For example, the Scale.x_log10 aesthetic maps the  x aesthetic back to the x aesthetic after applying a log10 transformation, but keeps track of the original value so that data points are properly identified."
},

{
    "location": "lib/scales.html#Available-Scales-1",
    "page": "Scales",
    "title": "Available Scales",
    "category": "section",
    "text": "Pages = map(file -> joinpath(\"scales\", file), readdir(\"scales\"))\nDepth = 1"
},

{
    "location": "lib/scales/scale_color_continuous.html#",
    "page": "Scale.color_continuous",
    "title": "Scale.color_continuous",
    "category": "page",
    "text": "Author = \"David Chudzicki\""
},

{
    "location": "lib/scales/scale_color_continuous.html#Scale.color_continuous-1",
    "page": "Scale.color_continuous",
    "title": "Scale.color_continuous",
    "category": "section",
    "text": "Create a continuous color scale that the plot will use.This can also be set as the continuous_color_scheme in a Theme"
},

{
    "location": "lib/scales/scale_color_continuous.html#Arguments-1",
    "page": "Scale.color_continuous",
    "title": "Arguments",
    "category": "section",
    "text": "minvalue (optional): the data value corresponding to the bottom of the color scale (will be based on the range of the data if not specified).\nmaxvalue (optional): the data value corresponding to the top of the color scale (will be based on the range of the data if not specified).\ncolormap: A function defined on the interval from 0 to 1 that returns a Color (as from the Colors package)."
},

{
    "location": "lib/scales/scale_color_continuous.html#Variations-1",
    "page": "Scale.color_continuous",
    "title": "Variations",
    "category": "section",
    "text": "color_continuous_gradient is an alias for Scale.color_continuous.A number of transformed continuous scales are provided.Scale.color_continuous (scale without any transformation).\nScale.color_log10\nScale.color_log2\nScale.color_log\nScale.color_asinh\nScale.color_sqrt"
},

{
    "location": "lib/scales/scale_color_continuous.html#Aesthetics-Acted-On-1",
    "page": "Scale.color_continuous",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "color"
},

{
    "location": "lib/scales/scale_color_continuous.html#Examples-1",
    "page": "Scale.color_continuous",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nsrand(1234)# The data are all between 0 and 1, but the color scale goes from -1 to 1.\n# For example, you might do this to force a consistent color scale between plots.\nplot(x=rand(12), y=rand(12), color=rand(12),\n     Scale.color_continuous(minvalue=-1, maxvalue=1))Define a custom color scale for a grid:using Colors\nx = repeat(collect(1:10), inner=[10])\ny = repeat(collect(1:10), outer=[10])\nplot(x=x, y=y, color=x+y, Geom.rectbin,\n     Scale.color_continuous(colormap=p->RGB(0,p,0)))Or we can use lab_gradient to construct a color gradient between 2 or more colors:plot(x=x, y=y, color=x+y, Geom.rectbin,\n     Scale.color_continuous(colormap=Scale.lab_gradient(colorant\"green\",\n                                                        colorant\"white\",\n                                                        colorant\"red\")))We can also start the color scale somewhere other than the bottom of the data range using minvalue:plot(x=x, y=y, color=x+y, Geom.rectbin,\n     Scale.color_continuous(colormap=p->RGB(0,p,0), minvalue=-20))"
},

{
    "location": "lib/scales/scale_color_discrete_hue.html#",
    "page": "Scale.color_discrete_hue",
    "title": "Scale.color_discrete_hue",
    "category": "page",
    "text": "Author = \"David Chudzicki\""
},

{
    "location": "lib/scales/scale_color_discrete_hue.html#Scale.color_discrete_hue-1",
    "page": "Scale.color_discrete_hue",
    "title": "Scale.color_discrete_hue",
    "category": "section",
    "text": "Create a discrete color scale to be used for the plot. Scale.color_discrete is an alias for Scale.color_discrete_hue."
},

{
    "location": "lib/scales/scale_color_discrete_hue.html#Arguments-1",
    "page": "Scale.color_discrete_hue",
    "title": "Arguments",
    "category": "section",
    "text": "f (optional): A function f(n) that produces a vector of n colors. Usually distinguishable_colors can be used for this, with parameters tuned to your liking.\nlevels (optional, keyword): Explicitly set levels used by the scale.\norder (optional, keyword): A vector of integers giving a permutation of the levels default order.\npreserve_order (optional, keyword): If set to true, orders levels as they appear in the data"
},

{
    "location": "lib/scales/scale_color_discrete_hue.html#Examples-1",
    "page": "Scale.color_discrete_hue",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nsrand(1234)"
},

{
    "location": "lib/scales/scale_color_discrete_hue.html#Examples-2",
    "page": "Scale.color_discrete_hue",
    "title": "Examples",
    "category": "section",
    "text": "You can set a discrete color scale of your choice in a plot.\nfunction gen_colors(n)\n  cs = distinguishable_colors(n,\n      [colorant\"#FE4365\", colorant\"#eca25c\"], # seed colors\n      lchoices=Float64[58, 45, 72.5, 90],     # lightness choices\n      transform=c -> deuteranopic(c, 0.1),    # color transform\n      cchoices=Float64[20,40],                # chroma choices\n      hchoices=[75,51,35,120,180,210,270,310] # hue choices\n  )\n\n  convert(Vector{Color}, cs)\nend\n\nusing RDatasets\n\niris = dataset(\"datasets\", \"iris\")\n\nplot(iris, x=:SepalLength, y=:SepalWidth, color=:Species,\n     Geom.point, Scale.color_discrete(gen_colors))\nYou can force the use of a discrete scale on data that would otherwise receive a continuous scale:plot(x=rand(12), y=rand(12), color=repeat([1,2,3], outer=[4]),\n     Scale.color_discrete())To set a default color scale for plots, you can set it in the current Theme using push_theme, using style to modify the current theme.Gadfly.push_theme(\n    style(\n        discrete_color_scale=Scale.color_discrete(gen_colors)\n    )\n)\n\nGadfly.pop_theme() # hide"
},

{
    "location": "lib/scales/scale_color_discrete_manual.html#",
    "page": "Scale.color_discrete_manual",
    "title": "Scale.color_discrete_manual",
    "category": "page",
    "text": "Author = \"David Chudzicki\""
},

{
    "location": "lib/scales/scale_color_discrete_manual.html#Scale.color_discrete_manual-1",
    "page": "Scale.color_discrete_manual",
    "title": "Scale.color_discrete_manual",
    "category": "section",
    "text": "Create a discrete color scale to be used for the plot."
},

{
    "location": "lib/scales/scale_color_discrete_manual.html#Arguments-1",
    "page": "Scale.color_discrete_manual",
    "title": "Arguments",
    "category": "section",
    "text": "colors...: an iterable collection of things that can be converted to colors with Colors.color (such as strings naming colors, although a better choice is to use colorant\"colorname\")\nlevels (optional): Explicitly set levels used by the scale. Order is respected.\norder (optional): A vector of integers giving a permutation of the levels default order."
},

{
    "location": "lib/scales/scale_color_discrete_manual.html#Aesthetics-Acted-On-1",
    "page": "Scale.color_discrete_manual",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "color"
},

{
    "location": "lib/scales/scale_color_discrete_manual.html#Examples-1",
    "page": "Scale.color_discrete_manual",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nsrand(1234)plot(x=rand(12), y=rand(12), color=repeat([\"a\",\"b\",\"c\"], outer=[4]),\n     Scale.color_discrete_manual(colorant\"red\",colorant\"purple\",colorant\"green\"))"
},

{
    "location": "lib/scales/scale_color_none.html#",
    "page": "Scale.color_none",
    "title": "Scale.color_none",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/scale_color_none.html#Scale.color_none-1",
    "page": "Scale.color_none",
    "title": "Scale.color_none",
    "category": "section",
    "text": "Suppress a default color scale. Some statistics impose a default color scale. When no color scale is desired, explicitly including Scale.color_none will suppress this default."
},

{
    "location": "lib/scales/scale_color_none.html#Examples-1",
    "page": "Scale.color_none",
    "title": "Examples",
    "category": "section",
    "text": "using Gadfly\nsrand(1234)xs = 1:10.\nys = 1:10.\nzs = Float64[x^2*log(y) for x in xs, y in ys]\nplot(x=xs, y=ys, z=zs, Geom.contour, Scale.color_none)"
},

{
    "location": "lib/scales/scale_x_continuous.html#",
    "page": "Scale.x_continuous",
    "title": "Scale.x_continuous",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/scale_x_continuous.html#Scale.x_continuous-1",
    "page": "Scale.x_continuous",
    "title": "Scale.x_continuous",
    "category": "section",
    "text": "Map numerical data to x positions in cartesian coordinates."
},

{
    "location": "lib/scales/scale_x_continuous.html#Arguments-1",
    "page": "Scale.x_continuous",
    "title": "Arguments",
    "category": "section",
    "text": "minvalue: Set scale lower bound to be ≤ this value.\nmaxvalue: Set scale lower bound to be ≥ this value.note: Note\nminvalue and maxvalue here are soft bounds, Gadfly may choose to ignore them when constructing an optimal plot. Use Coord.cartesian to enforce a hard bound.labels: Either a Function or nothing. When a function is given, values are formatted using this function. The function should map a value in x to a string giving its label. If the scale applies a transformation, transformed label values will be passed to this function.\nformat: How numbers should be formatted. One of :plain, :scientific, :engineering, or :auto. The default in :auto which prints very large or very small numbers in scientific notation, and other numbers plainly.\nscalable: When set to false, scale is fixed when zooming (default: true)"
},

{
    "location": "lib/scales/scale_x_continuous.html#Variations-1",
    "page": "Scale.x_continuous",
    "title": "Variations",
    "category": "section",
    "text": "A number of transformed continuous scales are provided.Scale.x_continuous (scale without any transformation).\nScale.x_log10\nScale.x_log2\nScale.x_log\nScale.x_asinh\nScale.x_sqrt"
},

{
    "location": "lib/scales/scale_x_continuous.html#Aesthetics-Acted-On-1",
    "page": "Scale.x_continuous",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "x, xmin, xmax, xintercept"
},

{
    "location": "lib/scales/scale_x_continuous.html#Examples-1",
    "page": "Scale.x_continuous",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nsrand(1234)# Transform both dimensions\nplot(x=rand(10), y=rand(10), Scale.x_log)# Force the viewport\nplot(x=rand(10), y=rand(10), Scale.x_continuous(minvalue=-10, maxvalue=10))# Use scientific notation\nplot(x=rand(10), y=rand(10), Scale.x_continuous(format=:scientific))# Use manual formatting\nplot(x=rand(10), y=rand(10), Scale.x_continuous(labels=x -> @sprintf(\"%0.4f\", x)))"
},

{
    "location": "lib/scales/scale_x_discrete.html#",
    "page": "Scale.x_discrete",
    "title": "Scale.x_discrete",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/scale_x_discrete.html#Scale.x_discrete-1",
    "page": "Scale.x_discrete",
    "title": "Scale.x_discrete",
    "category": "section",
    "text": "Map data categorical to Cartesian coordinates. Unlike Scale.x_continuous, each unique x value will be mapped to a equally spaced positions, regardless of value.By default continuous scales are applied to numerical data. If data consists of numbers specifying categories, explicitly adding Scale.x_discrete is the easiest way to get that data to plot appropriately."
},

{
    "location": "lib/scales/scale_x_discrete.html#Arguments-1",
    "page": "Scale.x_discrete",
    "title": "Arguments",
    "category": "section",
    "text": "labels: Either a Function or nothing. When a function is given, values are formatted using this function. The function should map a value in x to a string giving its label.\nlevels: If non-nothing, give values for the scale. Order will be respected and anything in the data that's not respresented in levels will be set to NA.\norder: If non-nothing, give a vector of integers giving a permutation of the values pool of the data."
},

{
    "location": "lib/scales/scale_x_discrete.html#Aesthetics-Acted-On-1",
    "page": "Scale.x_discrete",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "x, xmin, xmax, xintercept"
},

{
    "location": "lib/scales/scale_x_discrete.html#Examples-1",
    "page": "Scale.x_discrete",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)# Treat numerical x data as categories\nplot(x=rand(1:3, 20), y=rand(20), Scale.x_discrete)"
},

{
    "location": "lib/scales/scale_y_continuous.html#",
    "page": "Scale.y_continuous",
    "title": "Scale.y_continuous",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/scale_y_continuous.html#Scale.y_continuous-1",
    "page": "Scale.y_continuous",
    "title": "Scale.y_continuous",
    "category": "section",
    "text": "Map numerical data to y positions in cartesian coordinates."
},

{
    "location": "lib/scales/scale_y_continuous.html#Arguments-1",
    "page": "Scale.y_continuous",
    "title": "Arguments",
    "category": "section",
    "text": "minvalue: Set scale lower bound to be ≤ this value.\nmaxvalue: Set scale lower bound to be ≥ this value.note: Note\nminvalue and maxvalue here are soft bounds, Gadfly may choose to ignore them when constructing an optimal plot. Use Coord.cartesian to enforce a hard bound.labels: Either a Function or nothing. When a function is given, values are formatted using this function. The function should map a value in x to a string giving its label. If the scale applies a transformation, transformed label values will be passed to this function.\nformat: How numbers should be formatted. One of :plain, :scientific, :engineering, or :auto. The default in :auto which prints very large or very small numbers in scientific notation, and other numbers plainly.\nscalable: When set to false, scale is fixed when zooming (default: true)"
},

{
    "location": "lib/scales/scale_y_continuous.html#Variations-1",
    "page": "Scale.y_continuous",
    "title": "Variations",
    "category": "section",
    "text": "A number of transformed continuous scales are provided.Scale.y_continuous (scale without any transformation).\nScale.y_log10\nScale.y_log2\nScale.y_log\nScale.y_asinh\nScale.y_sqrt"
},

{
    "location": "lib/scales/scale_y_continuous.html#Aesthetics-Acted-On-1",
    "page": "Scale.y_continuous",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "y, ymin, ymax, yintercept"
},

{
    "location": "lib/scales/scale_y_continuous.html#Examples-1",
    "page": "Scale.y_continuous",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nsrand(1234)# Transform both dimensions\nplot(x=rand(10), y=rand(10), Scale.y_log)# Force the viewport\nplot(x=rand(10), y=rand(10), Scale.y_continuous(minvalue=-10, maxvalue=10))# Use scientific notation\nplot(x=rand(10), y=rand(10), Scale.y_continuous(format=:scientific))# Use manual formatting\nplot(x=rand(10), y=rand(10), Scale.y_continuous(labels=y -> @sprintf(\"%0.4f\", y)))"
},

{
    "location": "lib/scales/scale_y_discrete.html#",
    "page": "Scale.y_discrete",
    "title": "Scale.y_discrete",
    "category": "page",
    "text": "Author = \"Daniel C. Jones\""
},

{
    "location": "lib/scales/scale_y_discrete.html#Scale.y_discrete-1",
    "page": "Scale.y_discrete",
    "title": "Scale.y_discrete",
    "category": "section",
    "text": "Map data categorical to Cartesian coordinates. Unlike Scale.y_continuous, each unique y value will be mapped to a equally spaced positions, regardless of value.By default continuous scales are applied to numerical data. If data consists of numbers specifying categories, explicitly adding Scale.y_discrete is the easiest way to get that data to plot appropriately."
},

{
    "location": "lib/scales/scale_y_discrete.html#Arguments-1",
    "page": "Scale.y_discrete",
    "title": "Arguments",
    "category": "section",
    "text": "labels: Either a Function or nothing. When a function is given, values are formatted using this function. The function should map a value in x to a string giving its label.\nlevels: If non-nothing, give values for the scale. Order will be respected and anything in the data that's not respresented in levels will be set to NA.\norder: If non-nothing, give a vector of integers giving a permutation of the values pool of the data."
},

{
    "location": "lib/scales/scale_y_discrete.html#Aesthetics-Acted-On-1",
    "page": "Scale.y_discrete",
    "title": "Aesthetics Acted On",
    "category": "section",
    "text": "y, ymin, ymax, yintercept"
},

{
    "location": "lib/scales/scale_y_discrete.html#Examples-1",
    "page": "Scale.y_discrete",
    "title": "Examples",
    "category": "section",
    "text": "using RDatasets\nusing Gadfly\nGadfly.set_default_plot_size(12cm, 8cm)\nsrand(1234)# Treat numerical y data as categories\nplot(x=rand(20), y=rand(1:3, 20), Scale.y_discrete, Geom.point)"
},

]}
