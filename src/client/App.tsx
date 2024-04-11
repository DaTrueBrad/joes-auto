import React, {useState} from 'react';
import Header from './components/Header'; // Adjust the import path as needed
import SideMenu from './components/SideMenu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EndpointDetails from './components/EndpointDetails';
interface QueryParam {
  name: string;
  type: string; // Assuming this can be 'query', 'body', 'param', etc.
  dataType: string;
  description: string;
  required: boolean;
  default: string;
  example: string;
}
interface Endpoint {
  method: string;
  url: string;
  description: string;
  response: object;
  queries: QueryParam[];
}

const App: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);

  const handleEndpointSelect = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        <SideMenu onEndpointSelect={handleEndpointSelect} />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {selectedEndpoint && <EndpointDetails endpoint={selectedEndpoint} />}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
