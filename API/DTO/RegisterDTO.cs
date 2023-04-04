using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string userName { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4)]
        public string password { get; set; }
    }
}