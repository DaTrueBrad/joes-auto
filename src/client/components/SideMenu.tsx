import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';


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

interface SideMenuProps {
  onEndpointSelect: (endpoint: Endpoint) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onEndpointSelect }) => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await axios.get('/endpoints');
        setEndpoints(response.data);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      }
    };

    fetchEndpoints();
  }, []);

  const getStyleForMethod = (method: string) => {
    switch(method.toUpperCase()) {
        case 'GET': return { backgroundColor: '#1977d0', color: 'white' };
        case 'POST': return { backgroundColor: 'green', color: 'white' };
        case 'PUT': return { backgroundColor: 'orange', color: 'black' };
        case 'DELETE': return { backgroundColor: '#e72f2f', color: 'white' };
        default: return { backgroundColor: 'grey', color: 'white' };
    }
};

  return (
    <List sx={{width: 'fit-content', backgroundColor: "#d3d3d3", height: 'calc(100vh - headerHeight)', display: "flex", flexDirection: 'column', alignItems: 'center', paddingTop: 2}}>
      <Typography variant="h6" gutterBottom>
        API Endpoints
      </Typography>
      {endpoints.map((endpoint, index) => (
                <ListItem button key={index} onClick={() => onEndpointSelect(endpoint)}>
                    <Chip
                        label={endpoint.method}
                        size="small"
                        style={getStyleForMethod(endpoint.method)}
                    />
                    <Typography variant="body2" style={{ marginLeft: '10px' }}>
                        {endpoint.url}
                    </Typography>
                </ListItem>
            ))}
    </List>
  );
};

export default SideMenu;
