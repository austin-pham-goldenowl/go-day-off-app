import React from 'react';
import GutterGrid from '../testModules/material-ui/spacing';
import CenteredGrid from '../testModules/material-ui/basic-grid';
import FullWidthGrid from "../testModules/material-ui/grid-with-breakpoints";
import InteractiveGrid from "../testModules/material-ui/interactive";

const DemoUI = () => (
  <>
    <h1>DEMO @material-ui Grid</h1>
    <h2>Spacing</h2>
    <GutterGrid/>
    <h2>Centered Grid</h2>
    <CenteredGrid />
    <h2>Grid with Breakpoints</h2>
    <FullWidthGrid />
    <h2>Interactive Grid</h2>
    <InteractiveGrid />
  </>
);

export default DemoUI;