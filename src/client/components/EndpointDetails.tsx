import React from "react";
import {
  Box,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
//@ts-ignore
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
//@ts-ignore
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
interface QueryParam {
  name: string;
  type: string;
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

interface EndpointDetailsProps {
  endpoint: Endpoint;
}

interface QueryParam {
  name: string;
  type: string;
  dataType: string;
  description: string;
  required: boolean;
  default: string;
  example: string;
}

const EndpointDetails: React.FC<EndpointDetailsProps> = ({ endpoint }) => {
  const getStyleForMethod = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return { backgroundColor: "#1977d0", color: "white" };
      case "POST":
        return { backgroundColor: "green", color: "white" };
      case "PUT":
        return { backgroundColor: "orange", color: "black" };
      case "DELETE":
        return { backgroundColor: "#e72f2f", color: "white" };
      default:
        return { backgroundColor: "grey", color: "white" };
    }
  };

  const handleCopyUrl = () => {
    const fullUrl = `${window.location.origin}${endpoint.url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      console.log("URL copied to clipboard!");
      // You can also show a toast/notification to the user here
    });
  };

  const renderQuerySection = (type: string) => {
    const filteredQueries = endpoint.queries.filter(
      (query) => query.type === type
    );
    if (filteredQueries.length === 0) return null;

    return (
      <>
        <Typography variant="h6" gutterBottom>
          {type[0].toUpperCase() + type.slice(1)} Parameters:
        </Typography>
        <List>
          {filteredQueries.map((query, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={query.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {query.dataType}
                      </Typography>
                      {` - ${query.description}`}
                      {query.required && ` (Required)`}
                      {query.default && `; Default: ${query.default}`}
                    </>
                  }
                />
              </ListItem>
              {query.example && (
                <ListItem>
                  <ListItemText secondary={`Example: ${query.example}`} />
                </ListItem>
              )}
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginLeft: 4,
        marginRight: 200,
        paddingTop: 2,
      }}
    >
      <Box sx={{display: "flex", alignItems: 'center', gap: 4}}>
      <Typography variant="h3">{endpoint.url}</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopyUrl}
      >
        Copy URL
      </Button>
      </Box>
      <Chip
        label={endpoint.method}
        size="medium"
        style={getStyleForMethod(endpoint.method)}
      />
      <Typography variant="body2">{endpoint.description}</Typography>
      <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "40%"
        }}
        >
      {endpoint.queries && endpoint.queries.length > 0 && (
        <Box>
          {renderQuerySection("query")}
          {renderQuerySection("param")}
          {renderQuerySection("body")}
        </Box>
      )}

      </Box>
      <Box sx={{width: '40%'}}>
        <Typography variant="h6" gutterBottom>
          Example Response:
        </Typography>

      <SyntaxHighlighter language="json" style={docco} customStyle={{ width: '100%', overflowX: 'auto' }}>
        {endpoint.response && JSON.stringify(endpoint.response, null, 2)}
      </SyntaxHighlighter>
      </Box>
        </Box>
    </Box>
  );
};

export default EndpointDetails;
