import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business'; // Building icon
import StorefrontIcon from '@mui/icons-material/Storefront'; // Floor icon
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Location icon
import siteData from './FUJITA_CAMPUS_CURRENT.json';

// Transform the building data into a hierarchical structure
const transformData = (data) => {
    const result = [];
    const { Facilities } = data.Site || {};
  
    Facilities.forEach((facility, index) => {
      const facilityId = `facility-${index}`;
      result.push({
        id: facilityId,
        label: facility.Name,
        type: 'facility',
        children: facility.Floors.map((floor, floorIndex) => {
          const floorId = `${facilityId}-floor-${floorIndex}`;
          return {
            id: floorId,
            label: `${floor.Floor_Number} Floor`,
            type: 'floor',
            children: floor.Location.map((location, locationIndex) => ({
              id: `${floorId}-location-${locationIndex}`,
              label: location.Name,
              type: 'location',
            })),
          };
        }),
      });
    });
  
    return result;
  };
  
  const SITE_STRUCTURE = transformData(siteData);
  
  const TreeNode = ({ node, expandedNodeIds, onNodeClick, onLeafClick, selectedNodeId }) => {
    const isExpanded = expandedNodeIds.includes(node.id);
    const isSelected = selectedNodeId === node.id;
  
    const handleClick = () => {
      if (node.children) {
        onNodeClick(node.id);
      } else {
        onLeafClick(node);
      }
    };
  
    const renderIcon = () => {
      switch (node.type) {
        case 'facility':
          return <BusinessIcon />;
        case 'floor':
          return <StorefrontIcon />;
        case 'location':
          return <LocationOnIcon />;
        default:
          return null;
      }
    };
  
    return (
      <List sx={{}}>
        <ListItem button onClick={handleClick} sx={{
            backgroundColor: isSelected ? 'rgba(207, 174, 255, 0.2)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(188, 187, 187, 0.5)',
            },
            display: 'flex',
            gap: '20px'
          }}>
          {node.children && (isExpanded ? <ExpandMore /> : <KeyboardArrowRightIcon />)}
          {renderIcon()}
          <ListItemText primary={node.label} />
        </ListItem>
        {isExpanded && node.children && (
          <Box sx={{ pl: 4 }}>
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                expandedNodeIds={expandedNodeIds}
                onNodeClick={onNodeClick}
                onLeafClick={onLeafClick}
                selectedNodeId={selectedNodeId} 
              />
            ))}
          </Box>
        )}
      </List>
    );
  };
  
  export default function TreeViewComponent({ handleNodeClickValue, handleMenuItemClick }) {
    const [expandedNodeIds, setExpandedNodeIds] = React.useState([]);
    const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  
    const handleNodeClick = (nodeId) => {
      setExpandedNodeIds((prevExpandedNodeIds) =>
        prevExpandedNodeIds.includes(nodeId)
          ? prevExpandedNodeIds.filter(id => id !== nodeId)
          : [...prevExpandedNodeIds, nodeId]
      );
    };
  
    const handleLeafClick = (node) => {
      console.log('Leaf node clicked:', node);
      handleNodeClickValue(node.label);
      handleMenuItemClick(node.label, 0);
      setSelectedNodeId(node.id);
    };
  
    return (
      <Box sx={{ minHeight: 352, width: 275, margin: 'auto' }}>
        {SITE_STRUCTURE.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            expandedNodeIds={expandedNodeIds}
            onNodeClick={handleNodeClick}
            onLeafClick={handleLeafClick}
            selectedNodeId={selectedNodeId} 
          />
        ))}
      </Box>
    );
  }
  