import {Anchor, AppShell, Container, Text} from "@mantine/core";
import {useNavigate} from "@tanstack/react-router";

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <AppShell.Header pos={"sticky"}>
        <Container
          style={{ display: "flex", flexDirection: "column", alignItems: "center", top: '3.75rem' }}
        >
          <Anchor href={"/"}
            style={{textDecoration: "none"}}
            onClick={(e) => {
              e.preventDefault();
              void navigate({to: "/"})
            }}
          >
            <Text
              gradient={{ from: 'orange', to: 'grape', deg: 90 }} variant={'gradient'}
              fw={400} style={{fontSize: '2rem', cursor: 'pointer' }}
            >
              PasteIt
            </Text>
          </Anchor>
        </Container>
      </AppShell.Header>
    </>
  )
}