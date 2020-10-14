# Tesseract Example
A while ago I managed to write a raymarching algorithm to render 4D objects based on a given distance formula. That method was both inefficient (as it requires a distance estimator) and slow (because it used raytracing). These problems make a raymarching method impractical for real-world implimentation, so I decided to attempt a method that can be used in the real-world.

## How It Works
This project is an attempt at rendering 4D objects. Because I found that projection methods are often cluttered, this takes a 3D cross section of the 4D object and then renders that 3D 'slice'. The is do-able because the shapes are constructed using tetrahedra (the simplest possible 3D primative). Taking the cross section of a tetrahedron gives you either a quad or a triangle, both of which can be used for rendering. As to the actual storage of the 4D object, a method similar to rendering with indicies is used. All verticies are stored in an array. A vertex stores position, color, and (in the future) the normal. The second array is the tetrahedra list, and it just contains the four integers which represent which verticies are used.

During rendering, the cross section of the tetrahedra are calculated (and therefore the cross section of the scene). This is done by iterating through the tetrahedra list, finding the edges that make up the tetrahedra, finding the points that intersect with the W_LEVEL, and re-combining them into a renderable verticie list.

## Future Goals
In this project I hope to impliment some form of shading with normals, and past that point this repo will be discontinued.
Outside of this project, I plan on either creating a JS library for rendering this and/or a C/C++ library for doing the same thing.