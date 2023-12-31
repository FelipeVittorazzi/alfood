import { AppBar, Container, Toolbar, Typography, Box, Button, Link, Paper } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

const AppBarNavigate = () => {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{display:'flex', flexGrow: 1, justifyContent: 'center'}}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{my: 2, color: 'white'}}>
                                 Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurante/novo">
                                <Button sx={{my: 2, color: 'white'}}>
                                 Novo restaurante
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{display:'flex', flexGrow: 1, justifyContent: 'center'}}>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{my: 2, color: 'white'}}>
                                Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/prato/novo">
                                <Button sx={{my: 2, color: 'white'}}>
                                    Novo prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{mt: 1}}>
                    <Paper sx={{p: 2}}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default AppBarNavigate