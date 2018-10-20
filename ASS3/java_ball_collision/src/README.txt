Pool/Billiards Java Demo
(c) 2012 Louis. D. Nel

These are the java files used to implement the pool game demo. They are from an assignment we did in COMP 1406 in java. These files use the math model explained with the assignment.

Here are some observations.
Collisions are actually represented as objects and kept in a collisions collection. This was done so that collisions are not handled more than once.
 A classic problem called tunnelling happens if object collide and there direction of travel revered, but when the next timer event occurs the overlapping objects have not had time to clear each other. Hence the collision is handled again, reversing directions again and so the objects get stuck within each other.
