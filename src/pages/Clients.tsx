import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Campaign as CampaignIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Client } from '../types';

const initialClients: Client[] = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    industry: "Technology",
    email: "contact@techsolutions.com",
    website: "www.techsolutions.com",
    status: "active",
    createdAt: "2024-01-01"
  },
  // Add more sample clients...
];

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [openDialog, setOpenDialog] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({});
  const navigate = useNavigate();

  const handleAddClient = () => {
    setNewClient({});
    setOpenDialog(true);
  };

  const handleSaveClient = () => {
    if (newClient.name && newClient.email) {
      setClients([
        ...clients,
        {
          id: clients.length + 1,
          name: newClient.name,
          industry: newClient.industry || '',
          email: newClient.email,
          website: newClient.website || '',
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        } as Client,
      ]);
      setOpenDialog(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Client Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          New Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        {clients.map((client) => (
          <Grid item xs={12} md={6} lg={4} key={client.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2 }}>{client.name[0]}</Avatar>
                  <Box>
                    <Typography variant="h6">{client.name}</Typography>
                    <Typography color="textSecondary">{client.industry}</Typography>
                  </Box>
                </Box>
                <Chip
                  label={client.status}
                  color={client.status === 'active' ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" component="p">
                  Email: {client.email}
                </Typography>
                <Typography variant="body2" component="p">
                  Website: {client.website}
                </Typography>
                <Typography variant="body2" component="p">
                  Client Since: {client.createdAt}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<CampaignIcon />}
                  onClick={() => navigate(`/campaigns/${client.id}`)}
                >
                  View Campaigns
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Client Name"
              fullWidth
              value={newClient.name || ''}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <TextField
              label="Industry"
              fullWidth
              value={newClient.industry || ''}
              onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={newClient.email || ''}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
            <TextField
              label="Website"
              fullWidth
              value={newClient.website || ''}
              onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveClient} variant="contained" color="primary">
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clients; 