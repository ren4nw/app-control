interface TextProps {
  type?: 'title' | 'label';
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <span>{children}</span>
  )
};

export default Text;
