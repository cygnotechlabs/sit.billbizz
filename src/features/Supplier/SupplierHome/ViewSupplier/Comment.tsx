import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import { Quill } from 'react-quill';
import 'quill-emoji';
import Pen from '../../../../assets/icons/Pen';
import Trash2 from '../../../../assets/icons/Trash2';
import ReactDOMServer from 'react-dom/server';
import "./Quill.css";
import Button from '../../../../Components/Button';
import ItalicIcon from '../../../../assets/icons/ItalicIcon';
import UnderlineIcon from '../../../../assets/icons/UnderlineIcon';
import LinkIcon from '../../../../assets/icons/LinkIcon';
import ImageIcon from '../../../../assets/icons/ImageIcon';
import EmojiIcon from '../../../../assets/icons/EmojiIcon';
import BoldIcon from '../../../../assets/icons/BoldIcon';



const Emoji = Quill.import('formats/emoji');
Quill.register('modules/emoji', Emoji);
const icons = Quill.import('ui/icons');
const boldIconHTML = ReactDOMServer.renderToStaticMarkup(<BoldIcon color='#4B5C79' />);
const ItalicIconHTML = ReactDOMServer.renderToStaticMarkup(<ItalicIcon color='#4B5C79' />);
const UnderlineIconHTML = ReactDOMServer.renderToStaticMarkup(<UnderlineIcon color='#4B5C79' />);
const LinkIconHTML = ReactDOMServer.renderToStaticMarkup(<LinkIcon color='#4B5C79' />);
const ImageIconHTML = ReactDOMServer.renderToStaticMarkup(<ImageIcon />);
const EmojiIconHTML = ReactDOMServer.renderToStaticMarkup(<EmojiIcon />);

icons['bold'] = boldIconHTML;
icons['italic'] = ItalicIconHTML;
icons['underline'] = UnderlineIconHTML;
icons['link'] = LinkIconHTML;
icons['image'] = ImageIconHTML;
icons['emoji'] = EmojiIconHTML;

type Props = {};

const Comment: React.FC<Props> = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'emoji': true }],
    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };

  const imgSrc = "https://s3-alpha-sig.figma.com/img/1d07/dd79/425caa4701d548ea67930c965b34768d?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BDNG1uH8kJDCORYIU6gY2OiXnwJ45TKOIHXSp5rpFlxBxG-ezjO7zF9CJHJ0u7nvfXp81pS0uiL9NFk3ZXnnnrWXBCl8lYcI34QSkmPZ9LeX1IYnaCDbkT1pbgsshNh78rQV8YKUVyR2DGe89caWnTzWaiK46tQR1DFEbg4BrK9GbDG3Zk9gYPMg8hzd5vHdkprIcs6tMdO0E~g66m1qJnzYtasiiq93tpppjbHECvc3nIIN7OOgL0hNimgwX6oVQlLmvwGXf113NtG4haH~loXVngkLCjfEceHqEjEMhUIBD4zKLLHucYEBPLeMBbrrREit~SC5tQ1oAIiVRMjwuA__";

  return (
    <div className="mt-6 flex justify-between">
      <div className="w-[50%] h-[80%]">
        <div className='flex items-start w-[100%] h-[250px]'>
        <img
          src={imgSrc}
          className="w-8 h-8 rounded-full"
          alt="User Avatar"
        />
        <ReactQuill
          value={value}
          onChange={setValue}
          placeholder="Write text here..."
          className="quill-editor ml-4 w-[90%] h-[80%]"
          theme="snow"
          modules={modules}
          />
          </div>
          <Button className='ml-12 text-sm font-medium bg-[#FCFFED] mt-5' variant='secondary' size='sm'>Add Comments</Button>
      </div>
      <div className="w-[50%] ml-6">
        <p className="text-textColor font-bold text-base">
          All Comments
          <span className="bg-cardBg w-8 h-6 ml-4 pt-1 pr-2.5 pb-1 pl-2.5 rounded font-semibold text-sm">3</span>
        </p>
        <div className="rounded-lg p-5 border border-[#DCDEE2] mt-4 mb-4 w-[85%]">
          <div className="flex items-center text-dropdownText justify-between">
            <div className='flex items-center gap-3'>
              <img src={imgSrc} alt="Comment Avatar" className="w-10 h-10 rounded-full" />
              <p className='text-sm font-medium'>Micheal Gough</p>
            </div>
            <div className='text-sm font-medium flex items-center gap-3'>
              <span className='border-r border-dropdownText pr-3'>12/07/2024</span>
              <span >10:05 AM</span>
            </div>
            <div className='flex items-center gap-3'>
              <Pen color='#4B5C79' size={16} />
              <Trash2 color='#4B5C79' />
            </div>
          </div>
          <div className='mt-4 text-xs text-dropdownText'>
            Lorem ipsum dolor sit amet consectetur. Ornare eu ac felis ut gravida. em ipsum dolor sit amet consectetur. Ornare eu ac felis ut gravida
          </div>
        </div>
        <div className="rounded-lg p-5 border border-[#DCDEE2]  w-[85%]">
          <div className="flex items-center text-dropdownText justify-between">
            <div className='flex items-center gap-3'>
              <img src={imgSrc} alt="Comment Avatar" className="w-10 h-10 rounded-full" />
              <p className='text-sm font-medium'>Micheal Gough</p>
            </div>
            <div className='text-sm font-medium flex items-center gap-3'>
              <span className='border-r border-dropdownText pr-3'>12/07/2024</span>
              <span >10:05 AM</span>
            </div>
            <div className='flex items-center gap-3'>
              <Pen color='#4B5C79' size={16} />
              <Trash2 color='#4B5C79' />
            </div>
          </div>
          <div className='mt-4 text-xs text-dropdownText'>
            Lorem ipsum dolor sit amet consectetur. Ornare eu ac felis ut gravida. em ipsum dolor sit amet consectetur. Ornare eu ac felis ut gravida
          </div>
        </div>

      </div>
    </div>
  );
};

export default Comment;
