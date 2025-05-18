import { Flex, Tag } from "antd";
interface TagInterface {
    tagTitle?: string;
    tagsData: Array<string>;
    selectedTags: Array<string>;
    handleChange: Function;
    disabled?: boolean;
}
const InputTag: React.FC<TagInterface> = (props: TagInterface) => {
    return (
        <Flex gap="4px 0" wrap justify="center" style={{ paddingTop: "20px" }}>
            {props.tagTitle && <span style={{ paddingRight: "20px" }}>{props.tagTitle}</span>}
            {props.disabled
                ? props.tagsData.map((tag, index) => <Tag key={index}>{tag}</Tag>)
                : props.tagsData.map((tag, index) => (
                      <Tag.CheckableTag
                          key={index}
                          checked={props.selectedTags.includes(tag)}
                          onChange={(checked) => props.handleChange(tag, checked)}
                      >
                          {tag}
                      </Tag.CheckableTag>
                  ))}
        </Flex>
    );
};

export default InputTag;
