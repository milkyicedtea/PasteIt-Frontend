import {Anchor, AppShell, Container, Text} from "@mantine/core";

export function Footer() {
  return (
    <AppShell.Footer zIndex={0} p={"sm"}>
      <Container style={{display: "flex", flexDirection: "row", gap: "4%", alignItems: "center"}}>
        <Anchor href={"https://051205.xyz"} style={{textDecoration: "none", color: "white"}}>
          <Text variant={"text"}>© 2025 051205.xyz</Text>
        </Anchor>
      </Container>
    </AppShell.Footer>
  )
}