import { Button, Flex } from "antd";
interface ButtonInterface {
    buttonName: string;
    onClick: Function;
    disabled?: boolean;
}
const PrimaryButton: React.FC<ButtonInterface> = (props: ButtonInterface) => (
    <Flex gap="small" justify="center" style={{ paddingTop: "20px" }}>
        <Button color="cyan" variant="solid" onClick={() => props.onClick()} disabled={props.disabled||false}>
            {props.buttonName}
        </Button>
    </Flex>
);

export default PrimaryButton;
