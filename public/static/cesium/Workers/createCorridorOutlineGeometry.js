define(["./GeometryOffsetAttribute-d889f085","./arrayRemoveDuplicates-216006b0","./Transforms-e9dbfb40","./Cartesian2-49b1de22","./Check-6c0211bc","./ComponentDatatype-6d99a1ee","./PolylineVolumeGeometryLibrary-8f28f929","./CorridorGeometryLibrary-87f97344","./when-54c2dc71","./GeometryAttribute-669569db","./GeometryAttributes-4fcfcf40","./IndexDatatype-46306178","./Math-44e92d6b","./PolygonPipeline-72c97573","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./EllipsoidTangentPlane-c4704d0f","./IntersectionTests-6ead8677","./Plane-8f7e53d1","./PolylinePipeline-eb80587e","./EllipsoidGeodesic-a2d57ae0","./EllipsoidRhumbLine-9b557f71"],function(v,u,p,M,e,R,B,U,F,Y,q,W,f,A,t,i,r,o,a,n,s,l){"use strict";var J=new M.Cartesian3,j=new M.Cartesian3,z=new M.Cartesian3;function _(e,t){var i,r=[],o=e.positions,a=e.corners,n=e.endPositions,s=new q.GeometryAttributes,l=0,d=0,u=0;for(w=0;w<o.length;w+=2)l+=i=o[w].length-3,u+=i/3*4,d+=o[w+1].length-3;for(l+=3,d+=3,w=0;w<a.length;w++){O=a[w];var p=a[w].leftPositions;F.defined(p)?l+=i=p.length:d+=i=a[w].rightPositions.length,u+=i/3*2}var f,h=F.defined(n);h&&(l+=f=n[0].length-3,d+=f,u+=4*(f/=3));var y,c,g,b,m,v,e=l+d,A=new Float64Array(e),_=0,E=e-1,C=f/2,G=W.IndexDatatype.createTypedArray(e/3,u+4),T=0;if(G[T++]=_/3,G[T++]=(E-2)/3,h){r.push(_/3),v=J,m=j;for(var P=n[0],w=0;w<C;w++)v=M.Cartesian3.fromArray(P,3*(C-1-w),v),m=M.Cartesian3.fromArray(P,3*(C+w),m),U.CorridorGeometryLibrary.addAttribute(A,m,_),U.CorridorGeometryLibrary.addAttribute(A,v,void 0,E),b=(c=_/3)+1,g=(y=(E-2)/3)-1,G[T++]=y,G[T++]=g,G[T++]=c,G[T++]=b,_+=3,E-=3}var L=0,D=o[L++],k=o[L++];for(A.set(D,_),A.set(k,E-k.length+1),i=k.length-3,r.push(_/3,(E-2)/3),w=0;w<i;w+=3)b=(c=_/3)+1,g=(y=(E-2)/3)-1,G[T++]=y,G[T++]=g,G[T++]=c,G[T++]=b,_+=3,E-=3;for(w=0;w<a.length;w++){var N,O,V,x=(O=a[w]).leftPositions,H=O.rightPositions,I=z;if(F.defined(x)){for(E-=3,V=g,r.push(b),N=0;N<x.length/3;N++)I=M.Cartesian3.fromArray(x,3*N,I),G[T++]=V-N-1,G[T++]=V-N,U.CorridorGeometryLibrary.addAttribute(A,I,void 0,E),E-=3;r.push(V-Math.floor(x.length/6)),t===B.CornerType.BEVELED&&r.push((E-2)/3+1),_+=3}else{for(_+=3,V=b,r.push(g),N=0;N<H.length/3;N++)I=M.Cartesian3.fromArray(H,3*N,I),G[T++]=V+N,G[T++]=V+N+1,U.CorridorGeometryLibrary.addAttribute(A,I,_),_+=3;r.push(V+Math.floor(H.length/6)),t===B.CornerType.BEVELED&&r.push(_/3-1),E-=3}for(D=o[L++],k=o[L++],D.splice(0,3),k.splice(k.length-3,3),A.set(D,_),A.set(k,E-k.length+1),i=k.length-3,N=0;N<k.length;N+=3)c=(b=_/3)-1,y=(g=(E-2)/3)+1,G[T++]=y,G[T++]=g,G[T++]=c,G[T++]=b,_+=3,E-=3;_-=3,E+=3,r.push(_/3,(E-2)/3)}if(h){_+=3,E-=3,v=J,m=j;var S=n[1];for(w=0;w<C;w++)v=M.Cartesian3.fromArray(S,3*(f-w-1),v),m=M.Cartesian3.fromArray(S,3*w,m),U.CorridorGeometryLibrary.addAttribute(A,v,void 0,E),U.CorridorGeometryLibrary.addAttribute(A,m,_),c=(b=_/3)-1,y=(g=(E-2)/3)+1,G[T++]=y,G[T++]=g,G[T++]=c,G[T++]=b,_+=3,E-=3;r.push(_/3)}else r.push(_/3,(E-2)/3);return G[T++]=_/3,G[T++]=(E-2)/3,s.position=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:A}),{attributes:s,indices:G,wallIndices:r}}function h(e){var t=(e=F.defaultValue(e,F.defaultValue.EMPTY_OBJECT)).positions,i=e.width,r=F.defaultValue(e.height,0),o=F.defaultValue(e.extrudedHeight,r);this._positions=t,this._ellipsoid=M.Ellipsoid.clone(F.defaultValue(e.ellipsoid,M.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(r,o),this._extrudedHeight=Math.min(r,o),this._cornerType=F.defaultValue(e.cornerType,B.CornerType.ROUNDED),this._granularity=F.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*M.Cartesian3.packedLength+M.Ellipsoid.packedLength+6}h.pack=function(e,t,i){i=F.defaultValue(i,0);var r=e._positions,o=r.length;t[i++]=o;for(var a=0;a<o;++a,i+=M.Cartesian3.packedLength)M.Cartesian3.pack(r[a],t,i);return M.Ellipsoid.pack(e._ellipsoid,t,i),i+=M.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=F.defaultValue(e._offsetAttribute,-1),t};var y=M.Ellipsoid.clone(M.Ellipsoid.UNIT_SPHERE),c={positions:void 0,ellipsoid:y,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return h.unpack=function(e,t,i){t=F.defaultValue(t,0);for(var r=e[t++],o=new Array(r),a=0;a<r;++a,t+=M.Cartesian3.packedLength)o[a]=M.Cartesian3.unpack(e,t);var n=M.Ellipsoid.unpack(e,t,y);t+=M.Ellipsoid.packedLength;var s=e[t++],l=e[t++],d=e[t++],u=e[t++],p=e[t++],f=e[t];return F.defined(i)?(i._positions=o,i._ellipsoid=M.Ellipsoid.clone(n,i._ellipsoid),i._width=s,i._height=l,i._extrudedHeight=d,i._cornerType=u,i._granularity=p,i._offsetAttribute=-1===f?void 0:f,i):(c.positions=o,c.width=s,c.height=l,c.extrudedHeight=d,c.cornerType=u,c.granularity=p,c.offsetAttribute=-1===f?void 0:f,new h(c))},h.createGeometry=function(e){var t=e._positions,i=e._width,r=e._ellipsoid,t=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(t,r),o=u.arrayRemoveDuplicates(t,M.Cartesian3.equalsEpsilon);if(!(o.length<2||i<=0)){var a,n=e._height,s=e._extrudedHeight,t=!f.CesiumMath.equalsEpsilon(n,s,0,f.CesiumMath.EPSILON2),i={ellipsoid:r,positions:o,width:i,cornerType:e._cornerType,granularity:e._granularity,saveAttributes:!1};t?(i.height=n,i.extrudedHeight=s,i.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.ellipsoid,i=(l=_(U.CorridorGeometryLibrary.computePositions(e),e.cornerType)).wallIndices,r=e.height,o=e.extrudedHeight,a=l.attributes,n=l.indices,s=(d=a.position.values).length;(u=new Float64Array(s)).set(d);var l=new Float64Array(2*s),d=A.PolygonPipeline.scaleToGeodeticHeight(d,r,t),u=A.PolygonPipeline.scaleToGeodeticHeight(u,o,t);l.set(d),l.set(u,s),a.position.values=l,s/=3,F.defined(e.offsetAttribute)&&(u=new Uint8Array(2*s),u=e.offsetAttribute===v.GeometryOffsetAttribute.TOP?v.arrayFill(u,1,0,s):(e=e.offsetAttribute===v.GeometryOffsetAttribute.NONE?0:1,v.arrayFill(u,e)),a.applyOffset=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u}));var p=n.length,f=W.IndexDatatype.createTypedArray(l.length/3,2*(p+i.length));f.set(n);for(var h,y,c=p,g=0;g<p;g+=2){var b=n[g],m=n[g+1];f[c++]=b+s,f[c++]=m+s}for(g=0;g<i.length;g++)y=(h=i[g])+s,f[c++]=h,f[c++]=y;return{attributes:a,indices:f}}(i)):((a=_(U.CorridorGeometryLibrary.computePositions(i),i.cornerType)).attributes.position.values=A.PolygonPipeline.scaleToGeodeticHeight(a.attributes.position.values,n,r),F.defined(e._offsetAttribute)&&(l=a.attributes.position.values.length,d=new Uint8Array(l/3),l=e._offsetAttribute===v.GeometryOffsetAttribute.NONE?0:1,v.arrayFill(d,l),a.attributes.applyOffset=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:d})));var l=a.attributes,d=p.BoundingSphere.fromVertices(l.position.values,void 0,3);return new Y.Geometry({attributes:l,indices:a.indices,primitiveType:Y.PrimitiveType.LINES,boundingSphere:d,offsetAttribute:e._offsetAttribute})}},function(e,t){return(e=F.defined(t)?h.unpack(e,t):e)._ellipsoid=M.Ellipsoid.clone(e._ellipsoid),h.createGeometry(e)}});