grammar StlAscii;

@header {
    package rocks.spiffy.stl;
}

Solid: 'solid';
EndSolid: 'endsolid';

FacetNormal: 'facet normal';
EndFacetNormal: 'endfacet';

OuterLoop: 'outer loop';
EndOuterLoop: 'endloop';

Vertex: 'vertex';

ExpNumber: DecimalNumber Exponent?;
Name: ('A'..'Z' | 'a'..'z' | '_' | '0' .. '9')+;

fragment Exponent: 'e' RealNumber;
fragment DecimalNumber: Sign? ('0' .. '9')+ ('.' ('0' .. '9')+)?;
fragment RealNumber: Sign? ('0' .. '9')+;
fragment Sign: '-';
WS: (' ' | '\t' | '\n' | '\r' )+;
Space: ' ';
fragment NL:  '\r'? '\n';

solids: (solid)+ EOF;

solid: Solid WS name=Name WS
            facets WS
       EndSolid WS Name WS?;

facets: (facet WS)* facet WS?;

facet: FacetNormal WS normalX=ExpNumber WS normalY=ExpNumber WS normalZ=ExpNumber WS
           OuterLoop WS
               vertex
               vertex
               vertex
          EndOuterLoop WS
       EndFacetNormal;

vertex: Vertex WS vertexX=ExpNumber WS vertexY=ExpNumber WS vertexZ=ExpNumber WS;