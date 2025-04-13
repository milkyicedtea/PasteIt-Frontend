import {Anchor, AppShell, Text, useMantineColorScheme} from "@mantine/core";

export function Footer() {
  const {colorScheme} = useMantineColorScheme()

  return (
    <AppShell.Footer zIndex={0} p={"sm"}>
        <Anchor href={"https://051205.xyz"}
          style={{
            display: "inline-block",
            textDecoration: "none",
            color: colorScheme === "dark"
              ? "white"
            : colorScheme === "light"
              ? "black"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "white"
              : "black"
          }}
        >
          <Text variant={"text"}>© 2025 051205.xyz</Text>
        </Anchor>
    </AppShell.Footer>
  )
}
