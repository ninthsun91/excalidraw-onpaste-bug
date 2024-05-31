'use client';

import { useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

import type { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

export function Whiteboard() {
  const apiRef = useRef<ExcalidrawImperativeAPI>(null!);
  const [initialized, setInitialized] = useState(false);

  const init = async (api: ExcalidrawImperativeAPI) => {
    if (initialized) return;
    apiRef.current = api;

    setInitialized(true);
  };

  const onChangeHandler = (elements: readonly ExcalidrawElement[], state: AppState, files: BinaryFiles) => {
    if (state.activeTool.type === 'image' && state.cursorButton === 'down') {
      console.log("files added", files);
    }
  };
  
  return (
    <div className="border border-red-500 h-screen">
      <Excalidraw
        excalidrawAPI={init}
        onChange={onChangeHandler}
        onPaste={(data, event) => {
          console.log('onPaste', data, event)
          return true;
        }}
      />
    </div>
  );
}