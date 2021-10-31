import React from 'react'
import { Stage, Layer, Circle } from 'react-konva'

const Shape = () => {
    return <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
            <Circle x={200} y={200} radius={50} fill="green" />
        </Layer>
    </Stage>
}

export default Shape;

